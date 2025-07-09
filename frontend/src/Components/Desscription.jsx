import React from "react";
import './Description.css';

export default function Description() {
    return (
        <section className="description-section">
            <div className="description-block fade-in delay-0">
                <h2>MODEST CLOTHING ONLY</h2>
                <p>Carefully curated modest clothing pieces for every occasion.</p>
            </div>

            <div className="description-block fade-in delay-1">
                <h2>ONE STOP SHOP</h2>
                <p>Explore all modest fashion in one place  no more switching tabs.</p>
            </div>

            <div className="description-block fade-in delay-2">
                <h2>DISCOVER YOUR STYLE</h2>
                <p>Find modest fashion that fits your vibe, curated just for you.</p>
            </div>
        </section>
    );
}
