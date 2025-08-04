import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (err) {
        console.error("Invalid user data:", err);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const getInitials = () => {
    if (!user) return "A";
    const { firstName, lastName, email } = user;
    if (firstName || lastName) {
      return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
    }
    return email?.[0]?.toUpperCase() || "U";
  };

  const styles = {
    topbar: {
      height: "64px",
      backgroundColor: "#1e1e2f",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      boxSizing: "border-box",
      position: "fixed",
      top: 0,
      left: "240px", // adjust if sidebar width changes
      right: 0,
      zIndex: 1000,
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },
    homeButton: {
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: "700",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#6366f1",
      color: "#ffffff",
      cursor: "pointer",
      transition: "background-color 0.25s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    avatar: {
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      backgroundColor: "#4a4a60",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
    },
    welcomeText: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#f0f0f0",
    },
    logoutButton: {
      padding: "8px 18px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      borderRadius: "6px",
      backgroundColor: isHovered ? "#c62828" : "#e53935",
      color: "#ffffff",
      cursor: "pointer",
      transition: "background-color 0.25s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
  };

  return (
    <div style={styles.topbar}>
      <div style={styles.leftSection}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>{getInitials()}</div>
          <span style={styles.welcomeText}>
            Welcome, {user?.firstName || "Admin"}
          </span>
        </div>
        <button style={styles.homeButton} onClick={handleHomeClick}>
          Home
        </button>
      </div>
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
