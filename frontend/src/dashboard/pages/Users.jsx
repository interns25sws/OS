import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
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
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        newUser
      );
      setUsers([...users, res.data.user]);
      setShowForm(false);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      console.error("Add user error:", err);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen font-inter text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">
        User Management
      </h1>

      <button
        className="mb-6 px-5 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 transition"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add User"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddUser}
          className="mb-10 p-6 bg-white rounded-lg shadow space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              className="p-3 border border-gray-300 rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              className="p-3 border border-gray-300 rounded w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="p-3 border border-gray-300 rounded w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="p-3 border border-gray-300 rounded w-full"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-3 border border-gray-300 rounded w-full"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
              <option value="sales-rep">Sales Rep</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-500 transition"
          >
            Submit
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
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
