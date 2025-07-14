import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const UserAuth = ({ setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [setLoggedInUser, navigate]);

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (msg, type = "info") => {
    setMessage(msg);
    setStatusType(type);
  };

  const validate = () => {
    const { email, password, confirmPassword, firstName, lastName } = formData;
    if (!email || !password || (!isLogin && (!firstName || !lastName || !confirmPassword))) {
      return "All fields are required.";
    }
    if (!isLogin && password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return showMessage(error, "error");

    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/signup";

    const { email, password, firstName, lastName } = formData;
    const body = isLogin ? { email, password } : { email, password, firstName, lastName };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage(data.message, "success");

        if (isLogin) {
          const user = {
            email,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
          };
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setLoggedInUser(user);
          navigate("/");
        } else {
          setIsLogin(true);
          resetForm();
        }
      } else {
        showMessage(data.message || "Something went wrong", "error");
      }
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  return (
    <div className="auth-container">
      <h2
        onClick={() => navigate("/")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          color: hover ? "#007bff" : "black",
          transition: "color 0.3s ease",
        }}
      >
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="auth-input"
              required
            />
            <input
              type="text"
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

      {message && <p className={`auth-message auth-${statusType}`}>{message}</p>}

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
            resetForm();
          }}
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default UserAuth;
