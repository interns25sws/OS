import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./login.css";

const UserAuth = ({ setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [showAdminPanel, setShowAdminPanel] = useState(false);


  const navigate = useNavigate();
  const emailInputRef = useRef(null);



  useEffect(() => {
  const role = localStorage.getItem("userRole"); // set it from login response
  if (["admin", "super-admin", "sales-rep"].includes(role)) {
    setShowAdminPanel(true);
  }
}, []);


  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };

  const [formData, setFormData] = useState(initialForm);
  const { firstName, lastName, email, password, confirmPassword, role } = formData;

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedInUser(parsedUser);
      redirectBasedOnRole(parsedUser.role);
    }
  }, [setLoggedInUser]);

  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    if (!email || !password) return "Email and Password are required.";
    if (!validateEmail(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";

    if (!isLogin) {
      if (!firstName || !lastName || !confirmPassword) return "All fields are required.";
      if (password !== confirmPassword) return "Passwords do not match.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const error = validate();
    if (error) {
      setStatusType("error");
      setMessage(error);
      return;
    }

    setLoading(true);
    const url = `http://localhost:5000/api/users/${isLogin ? "login" : "signup"}`;

    const body = isLogin
      ? { email, password }
      : {
          firstName,
          lastName,
          email,
          password,
          role: "user", // Default to user regardless of role field
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusType("success");
        setMessage(data.message || (isLogin ? "Login successful." : "Registered successfully."));

        if (isLogin) {
          const user = {
  _id: data._id,
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  token: data.token,
  role: data.role,
};

          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setLoggedInUser(user);
          redirectBasedOnRole(data.role);
        } else {
          resetForm();
          setIsLogin(true);
        }
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatusType("error");
      setMessage(err.message || "Network error.");
    } finally {
      setLoading(false);
    }
  };

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/dashboard");
        break;
      case "sales-rep":
        navigate("/dashboard");
        break;
      case "super-admin":
        navigate("/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const resetForm = () => setFormData(initialForm);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    resetForm();
    setMessage("");
  };

  return (
    <div className="auth-wrapper">
      <motion.div
        className="auth-card"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="auth-heading">
          {isLogin ? "🔐 Login to Your Account" : "📝 Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <>
              <input
                className="auth-input"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={handleChange}
                required
              />
              <input
                className="auth-input"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            ref={emailInputRef}
            required
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <input
              className="auth-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.p
              className={`auth-message ${statusType}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <span onClick={toggleMode}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default UserAuth;
