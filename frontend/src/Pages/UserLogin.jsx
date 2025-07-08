import React, { useState } from "react";
import "./UserLogin.css";

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailBlur = () => {
    if (!email) {
      setMessage(" Email cannot be empty.");
    } 
    else {
      setMessage(""); 
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setMessage(" Password cannot be empty.");
    } else {
      setMessage("");
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setMessage(" Confirm Password cannot be empty.");
    } else if (password !== confirmPassword) {
      setMessage(" Passwords do not match.");
    } 
    else {
      setMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");

    if (isLogin) {
      const validEmail = "user@example.com";
      const validPassword = "password123";

      if (email === validEmail && password === validPassword) {
        setMessage(" Login successful!");
      } else {
        setMessage(" Invalid email or password.");
      }
    } else {
      if (!email || !password || !confirmPassword) {
        setMessage(" Please fill out all fields.");
      } else if (password !== confirmPassword) {
        setMessage(" Passwords do not match.");
      } else {
        setMessage(" Sign up successful! You can now log in.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          required
          className="login-input"
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
            required
            className="login-input"
          />
        )}
        <button type="submit" className="login-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {message && <p className="login-message">{message}</p>}

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default UserLogin;
