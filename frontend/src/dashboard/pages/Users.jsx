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
      setUsers([...users, res.data.user]); // optionally re-fetch instead
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

  const styles = {
    container: {
      marginLeft: "20px",
      padding: "60px 40px",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#f1f5f9",
      minHeight: "100vh",
      color: "#1f2937",
    },
    title: {
      fontSize: "30px",
      fontWeight: 600,
      marginBottom: "30px",
      color: "#111827",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
      backgroundColor: "#ffffff",
    },
    th: {
      backgroundColor: "#f9fafb",
      color: "#6b7280",
      textAlign: "left",
      padding: "14px 20px",
      fontSize: "14px",
      borderBottom: "1px solid #e5e7eb",
    },
    td: {
      padding: "16px 20px",
      fontSize: "15px",
      borderBottom: "1px solid #f1f3f5",
      color: "#1f2937",
    },
    row: (index) => ({
      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
    }),
    actions: {
      display: "flex",
      gap: "10px",
    },
    buttonBase: {
      padding: "8px 14px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "1px solid transparent",
    },
    editBtn: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      borderColor: "#3b82f6",
    },
    deleteBtn: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
      borderColor: "#ef4444",
    },
    addUserBtn: {
      marginBottom: "20px",
      backgroundColor: "#6366f1",
      fontWeight: "700",
      color: "#ffffff",
      border: "none",
    },
    form: {
      marginBottom: "30px",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    input: {
      display: "block",
      marginBottom: "12px",
      padding: "10px",
      width: "100%",
      borderRadius: "4px",
      border: "1px solid #d1d5db",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Management</h1>

      <button
        style={{ ...styles.buttonBase, ...styles.addUserBtn }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add User"}
      </button>

      {showForm && (
        <form style={styles.form} onSubmit={handleAddUser}>
          <input
            style={styles.input}
            type="text"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
          <select
            style={styles.input}
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
            <option value="sales-rep">Sales Rep</option>
          </select>
          <button
            type="submit"
            style={{
              ...styles.buttonBase,
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
          >
            Submit
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={styles.row(index)}>
                <td style={styles.td}>
                  {user.firstName} {user.lastName}
                </td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      style={{ ...styles.buttonBase, ...styles.editBtn }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2563eb")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3b82f6")
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.buttonBase, ...styles.deleteBtn }}
                      onClick={() => handleDelete(user._id)}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#dc2626")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#ef4444")
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
