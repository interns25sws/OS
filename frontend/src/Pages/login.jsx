import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./login.css"; 

const UserAuth = ({ setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    termsAccepted: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [setLoggedInUser, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!formData.email || !formData.password) {
      return "Email and Password are required.";
    }
    if (!isLogin) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.confirmPassword ||
        !formData.termsAccepted
      ) {
        return "All fields are required and Terms must be accepted.";
      }
      if (formData.password !== formData.confirmPassword) {
        return "Passwords do not match.";
      }
      if (formData.password.length < 6) {
        return "Password should be at least 6 characters.";
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
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
        setMessage(data.message);
        setStatusType("success");

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
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
      termsAccepted: false,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    resetForm();
  };

  return (
    <div className="auth-wrapper">
      <motion.div
        className="auth-card"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="auth-heading">{isLogin ? "🔐 Login" : "📝 Register"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input className="auth-input" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              <input className="auth-input" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              <input className="auth-input" type="tel" name="phone" placeholder="Phone (optional)" value={formData.phone} onChange={handleChange} />
              <input className="auth-input" type="date" name="dob" value={formData.dob} onChange={handleChange} />
              <select className="auth-input" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </>
          )}

          <input className="auth-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input className="auth-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          {!isLogin && (
            <>
              <input className="auth-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
              <label className="auth-checkbox">
                <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                I accept the <a href="/terms" target="_blank">Terms and Conditions</a>
              </label>
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        {message && <p className={`auth-message ${statusType}`}>{message}</p>}

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleMode}>{isLogin ? "Register" : "Login"}</span>
        </p>
      </motion.div>
    </div>
  );
};

export default UserAuth;
