import React from 'react';
import useInView from "../hooks/useInView";
import './HIW.css';

const HowItWorks = () => {
    const [ref, isInView] = useInView();
  return (
    <div ref={ref} className={`fade-up ${isInView ? "animate" : ""}`}>
      {/* your content */}
    <section className="how-it-works">
      <h2 className="title">HOW IT WORKS</h2>
      <div className="card">
        <h3>Shop at Source</h3>
        <h4>How Jenatti Works</h4>
        <p>
          Clothing4U is an online modest fashion marketplace. We partner with trusted brands
          to bring you curated pieces from around the world. When you find something you
          love, we’ll direct you to the brand’s website to complete your purchase directly
          with them.
        </p>
        <p className="bold">
          Products are shipped and fulfilled by our brand partners.
        </p>
      </div>
    </section>
    </div>
  );
};

export default HowItWorks;
