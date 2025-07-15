import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Importing the CSS for styling

/**
 * UserAuth Component
 * Handles both Login and Sign Up functionality.
 */
const UserAuth = ({ setLoggedInUser }) => {
  // State to toggle between login and sign up
  const [isLogin, setIsLogin] = useState(true);

  // Form input state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // State for feedback messages
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info"); // can be "info", "success", or "error"

  const navigate = useNavigate();

  /**
   * useEffect hook: Check if user is already logged in.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [setLoggedInUser, navigate]);

  /**
   * Handle input changes and update form data state.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Validate the form fields.
   */
  const validate = () => {
    if (!formData.email || !formData.password) {
      return "Email and Password are required.";
    }

    if (!isLogin) {
      if (!formData.firstName || !formData.lastName || !formData.confirmPassword) {
        return "All fields are required for sign up.";
      }

      if (formData.password !== formData.confirmPassword) {
        return "Passwords do not match.";
      }
    }

    return null; // No errors
  };

  /**
   * Handle form submission for login or signup.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      setStatusType("error");
      return;
    }

    const url = `http://localhost:5000/api/${isLogin ? "login" : "signup"}`;

    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        // Success message
        setMessage(data.message);
        setStatusType("success");

        if (isLogin) {
          // Save user info in localStorage and update global state
          const user = {
            email: formData.email,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
          };
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setLoggedInUser(user);
          navigate("/");
        } else {
          // If signed up, reset form and switch to login
          setIsLogin(true);
          resetForm();
        }
      } else {
        setMessage(data.message || "Something went wrong");
        setStatusType("error");
      }
    } catch (err) {
      setMessage("Network error");
      setStatusType("error");
    }
  };

  /**
   * Reset all form fields.
   */
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  };

  /**
   * Toggle between login and signup views.
   */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    resetForm();
  };

  // JSX UI for the component
  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Show name fields only in sign up mode */}
        {!isLogin && (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="auth-input"
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="auth-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="auth-input"
          required
        />

        {/* Confirm password field shown only in sign up mode */}
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="auth-input"
            required
          />
        )}

        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Feedback message */}
      {message && <p className={`auth-message auth-${statusType}`}>{message}</p>}

      {/* Toggle link */}
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={toggleMode}
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default UserAuth;
