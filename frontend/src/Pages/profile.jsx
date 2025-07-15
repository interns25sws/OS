import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <p style={styles.loginPrompt}>
          Please <a href="/login" style={styles.loginLink}>log in</a> to view your profile.
        </p>
      </div>
    );
  }

  // Choose avatar emoji based on gender
  const avatarEmoji = user.gender === "female" ? "👩" : "👨";

  return (
    <div style={styles.pageWrapper}>
      <button onClick={goHome} style={styles.homeButton} aria-label="Go home">
        ← Home
      </button>

      <div style={styles.profileBox}>
        <div style={styles.avatar}>
          <span role="img" aria-label="user avatar" style={styles.avatarIcon}>
            {avatarEmoji}
          </span>
        </div>

        <h2
          onClick={goHome}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            ...styles.title,
            color: hover ? "#4a90e2" : "#34495e",
          }}
        >
          Your Profile
        </h2>

        <div style={styles.infoRow}>
          <span style={styles.label}>Name:</span>
          <span style={styles.infoText}>{user.firstName} {user.lastName}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Email:</span>
          <span style={styles.infoText}>{user.email}</span>
        </div>

        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#d32f2f"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#e53935"}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    // minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "2rem",
    position: "relative",
  },
  homeButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "transparent",
    border: "none",
    color: "#4a90e2",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    userSelect: "none",
    transition: "color 0.3s ease",
  },
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f7fa",
    padding: "2rem",
  },
  loginPrompt: {
    fontSize: "1.2rem",
    color: "#555",
  },
  loginLink: {
    color: "#4a90e2",
    textDecoration: "none",
    fontWeight: "600",
    borderBottom: "2px solid transparent",
    transition: "border-color 0.3s ease",
  },
  profileBox: {
    backgroundColor: "#fff",
    padding: "3rem 3.5rem",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    backgroundColor: "#4a90e2",
    borderRadius: "50%",
    margin: "0 auto 1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(74,144,226,0.4)",
  },
  avatarIcon: {
    fontSize: "56px",
    color: "#fff",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "2rem",
    userSelect: "none",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    borderBottom: "1px solid #eee",
  },
  label: {
    color: "#7f8c8d",
    fontWeight: "600",
    fontSize: "1rem",
    textAlign: "left",
  },
  infoText: {
    color: "#2c3e50",
    fontWeight: "500",
    fontSize: "1.1rem",
    textAlign: "right",
    wordBreak: "break-word",
  },
  logoutButton: {
    marginTop: "2.5rem",
    padding: "12px 28px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(229,57,53,0.5)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    userSelect: "none",
  },
};

export default Profile;
 