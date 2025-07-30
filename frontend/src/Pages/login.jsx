import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./login.css";

const UserAuth = ({ setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info");

  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    termsAccepted: false,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [setLoggedInUser, navigate]);

  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const { email, password, confirmPassword, firstName, lastName, termsAccepted } = formData;

    if (!email || !password) return "Email and Password are required.";
    if (!validateEmail(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";

    if (!isLogin) {
      if (!firstName || !lastName || !confirmPassword) return "All fields are required.";
      if (password !== confirmPassword) return "Passwords do not match.";
      if (!termsAccepted) return "You must accept the terms.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const error = validate();
    if (error) {
      setMessage(error);
      setStatusType("error");
      return;
    }

    setLoading(true);
    const url = `http://localhost:5000/api/users/${isLogin ? "login" : "signup"}`;

    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          dob: formData.dob,
          gender: formData.gender,
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
            email: formData.email,
            firstName: data.firstName,
            lastName: data.lastName,
            token: data.token,
          };
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setLoggedInUser(user);
          navigate("/");
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
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="auth-input"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                className="auth-input"
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                className="auth-input"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              <select
                className="auth-input"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </>
          )}

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            ref={emailInputRef}
            required
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
              <input
                className="auth-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </a>
              </label>
            </>
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
