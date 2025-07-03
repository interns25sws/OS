import React from "react";
import "./Recommendations.css"; 

export default function Recommendations() {
  return (
    <section className="recommendations-section">
      <div className="recommendations-container">
        <h1 className="recommendations-heading">
          See personalized recommendations
        </h1>
        <button className="recommendations-button">Sign in</button>
        <p className="recommendations-paragraph">
          New Customer?<a className="recommendations-start">Start Here</a>
        </p>
      </div>
    </section>
  );
}
