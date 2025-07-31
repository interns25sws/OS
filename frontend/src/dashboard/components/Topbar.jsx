import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    // Clear token/session
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/login");
  };

  const styles = {
    topbar: {
      height: "60px",
      backgroundColor: "#1e1e2f",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxSizing: "border-box",
      position: "fixed",
      top: 0,
      left: "220px", // matches sidebar width
      right: 0,
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    welcomeText: {
      fontSize: "18px",
      fontWeight: "500",
    },
    logoutButton: {
      padding: "8px 16px",
      fontSize: "14px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: isHovered ? "#cc0000" : "#ff4d4d",
      color: "#ffffff",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.topbar}>
      <span style={styles.welcomeText}>Welcome Admin</span>
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
