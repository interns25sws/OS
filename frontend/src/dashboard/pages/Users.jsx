import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  useEffect(() => {
    if (!token) {
      setError("Authentication token missing. Please login.");
      setLoading(false);
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      console.error("Fetch users error:", err);
      setError("Failed to load users.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

const handleAddUser = async (e) => {
  e.preventDefault();
  try {
    if (editingUser) {
      const updatedPayload = { ...newUser };
      if (!newUser.password) {
        delete updatedPayload.password; 
          console.log("Payload being sent:", updatedPayload); // Check this
      }

      const res = await axios.put(
        `http://localhost:5000/api/users/${editingUser._id}`,
        updatedPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUsers = users.map((u) =>
        u._id === editingUser._id ? res.data.user : u
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        newUser
      );
      setUsers([...users, res.data.user]);
    }

    setShowForm(false);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
    });
  } catch (err) {
    console.error("User save error:", err);
    alert("Failed to save user.");
  }
};


  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-inter text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
        User Management
      </h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingUser(null);
          setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "user",
          });
        }}
        className="mb-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow hover:bg-indigo-500 transition-all"
      >
        {showForm ? "Cancel" : "Add User"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddUser}
          className="mb-10 p-8 bg-white rounded-2xl shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder={
                  editingUser
                    ? "Leave blank to keep current password"
                    : "Enter password"
                }
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required={!editingUser}
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
                <option value="sales-rep">Sales Rep</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 mt-4 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-500 transition-all"
            >
              {editingUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Name</th>
                <th className="px-6 py-4 text-left font-medium">Email</th>
                <th className="px-6 py-4 text-left font-medium">Role</th>
                <th className="px-6 py-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-4 py-1 bg-blue-500 text-white rounded-lg text-xs shadow hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-lg text-xs shadow hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center px-6 py-6 text-gray-400 italic"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
