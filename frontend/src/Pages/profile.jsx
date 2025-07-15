import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

/**
 * Profile component shows the logged-in user's information
 * and allows them to logout. Redirects if no user is logged in.
 */
const Profile = () => {
  const navigate = useNavigate();

  // Get user data and logout method from AuthContext
  const { user, logout } = useContext(AuthContext);

  // State to handle hover effect on profile title
  const [hover, setHover] = useState(false);

  /**
   * Handle logout:
   *  - Clear user data from context/localStorage (via logout function)
   *  - Redirect user to login page
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // If user is not logged in (should be protected by route, but double-check)
  if (!user) {
    // Redirect to login page immediately
    navigate("/login");
    return null; // Prevent rendering profile content
  }

  return (
    <div style={styles.profileBox}>
      {/* Profile Title with hover color change and navigation to home on click */}
      <h2
        onClick={() => navigate("/")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...styles.title,
          color: hover ? "#007bff" : "#2c3e50",
        }}
      >
        👤 Profile
      </h2>

      {/* User information display */}
      <p style={styles.text}>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p style={styles.text}>
        <strong>Email:</strong> {user.email}
      </p>

      {/* Logout button with hover style changes */}
      <button
        onClick={handleLogout}
        style={styles.logoutButton}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#c62828")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#e53935")}
      >
        Logout
      </button>
    </div>
  );
};

// Inline styles object for consistent styling
const styles = {
  profileBox: {
    maxWidth: "420px",
    margin: "3rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fdfdfd",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "1.8rem",
    cursor: "pointer",
    transition: "color 0.3s ease",
    marginBottom: "1.5rem",
  },
  text: {
    fontSize: "1.1rem",
    margin: "0.8rem 0",
  },
  logoutButton: {
    marginTop: "1.5rem",
    padding: "10px 24px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Profile;
