import React, { useState, useEffect } from "react";
import "./login.css";

const UserAuth = ({ setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setIsLoggedIn(true);
      setLoggedInUser(storedUser);
    }
  }, [setLoggedInUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const showMessage = (msg, type = "info") => {
    setMessage(msg);
    setStatusType(type);
  };

  const validate = () => {
    if (!email || !password || (!isLogin && !confirmPassword))
      return "All fields are required.";
    if (!isLogin && password !== confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return showMessage(error, "error");

    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage(data.message, "success");
        if (isLogin) {
          localStorage.setItem("loggedInUser", email);
          setIsLoggedIn(true);
          setLoggedInUser(email);
        }
        if (!isLogin) {
          setIsLogin(true);
          resetForm();
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setLoggedInUser(null);
    resetForm();
    setMessage("");
  };

  if (isLoggedIn) {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <h2 className="welcome-message">🎉 Welcome, {email}!</h2>
          <p className="welcome-text">
            You're now logged in. Explore your dashboard or log out anytime.
          </p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            required
          />
        )}
        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {message && <p className={`auth-message auth-${statusType}`}>{message}</p>}
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default UserAuth;
