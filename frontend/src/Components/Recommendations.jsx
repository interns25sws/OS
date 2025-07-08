import React from "react";
import { useNavigate } from "react-router-dom";
import "./Recommendations.css";

export default function Recommendations() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/UserLogin");
  };

  return (
    <section className="recommendations-section">
      <div className="recommendations-container">
        <h1 className="recommendations-heading">
          See personalized recommendations
        </h1>

        <button className="recommendations-button" onClick={handleSignIn}>
          Sign in
        </button>

        <p className="recommendations-paragraph">
          New Customer?{" "}
          <span
            className="recommendations-start"
            onClick={handleSignIn}
            style={{ cursor: "pointer" }}
          >
            Start Here
          </span>
        </p>
      </div>
    </section>
  );
}
