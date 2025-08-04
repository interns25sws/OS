import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormData({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        email: parsedUser.email || "",
      });
      setLoggedInUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  const goHome = () => navigate("/");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updatedUser = { ...formData };
    setLoggedInUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <p className="text-lg text-gray-700">
          Please{" "}
          <a href="/login" className="text-blue-600 font-semibold underline">
            log in
          </a>{" "}
          to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-10 flex flex-col items-center relative">
      <button
        onClick={goHome}
        className="absolute top-4 left-4 text-blue-600 font-semibold hover:underline"
      >
        ← Home
      </button>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Profile
          </h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProfileInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            editable={editing}
          />
          <ProfileInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            editable={editing}
          />
          <ProfileInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            editable={false}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>

          {editing && (
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileInput = ({
  label,
  name,
  value,
  onChange,
  editable,
  type = "text",
  placeholder = "",
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm text-gray-500 font-medium mb-1">
      {label}
    </label>
    {editable ? (
      type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )
    ) : (
      <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 font-medium">
        {value || "N/A"}
      </div>
    )}
  </div>
);

export default Profile;
