import React from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";
import "./Recommendations.css";

export default function Recommendations() {
    const [ref, isInView] = useInView();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/UserLogin");
  };

  return (
    <div ref={ref} className={`fade-up ${isInView ? "animate" : ""}`}>
      {/* your content */}
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
            </div>
  );
}
