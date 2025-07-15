import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; 


const UserAuth = ({ setLoggedInUser }) => {
  // Toggle between login and signup mode
  const [isLogin, setIsLogin] = useState(true);

  // Form input data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // Feedback message and status type (info/success/error)
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info");

  const navigate = useNavigate();

  /**
   * On component mount: auto-login if user already exists in localStorage
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [setLoggedInUser, navigate]);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Validate form data
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
   * Handle login or signup form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation
    const error = validate();
    if (error) {
      setMessage(error);
      setStatusType("error");
      return;
    }

    // Prepare API URL and body
    const url = `http://localhost:5000/api/users/${isLogin ? "login" : "signup"}`;
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
        setMessage(data.message);
        setStatusType("success");

        if (isLogin) {
          // Save user data to localStorage
          const user = {
            email: formData.email,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
          };
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setLoggedInUser(user);
          navigate("/");
        } else {
          // After signup, switch to login mode
          setIsLogin(true);
          resetForm();
        }
      } else {
        setMessage(data.message || "Something went wrong.");
        setStatusType("error");
      }
    } catch (err) {
      setMessage("Network error");
      setStatusType("error");
    }
  };

  /**
   * Reset all form fields
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
   * Toggle between Login and Sign Up modes
   */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    resetForm();
  };

  // Render UI
  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* First and Last Name shown only in sign up */}
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

        {/* Confirm Password only shown in sign up */}
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

      {/* Show success/error message */}
      {message && <p className={`auth-message auth-${statusType}`}>{message}</p>}

      {/* Switch between login and signup */}
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
