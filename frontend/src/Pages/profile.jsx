import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <p style={{ padding: "2rem" }}>
        Please <a href="/login">log in</a> to view your profile.
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        onClick={() => navigate("/")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          color: hover ? "#007bff" : "#333",
          transition: "color 0.3s ease",
          marginBottom: "1.5rem",
        }}
      >
        👤 Profile
      </h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        <strong>Email:</strong> {user.email}
      </p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#e53935",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
