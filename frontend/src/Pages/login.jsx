import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const UserAuth = ({ setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
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
          role: "user",
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
      case "sales-rep":
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <motion.div
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? " Login to Your Account" : " Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            ref={emailInputRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`mt-2 py-2 px-4 rounded-md text-white font-semibold transition-all ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-3 text-sm rounded-md text-center border ${
                statusType === "success"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <span
            onClick={toggleMode}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default UserAuth;
