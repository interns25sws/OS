import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const reviews = [
    { name: 'Priya S.', text: 'My new washer is a game-changer. Great service!' },
    { name: 'Arjun M.', text: 'Excellent range of gadgets. I love my air fryer!' },
  ];

  return (
    <section className="testimonials-section">
      {/* <h2>What Our Customers Say</h2>
      <div className="testimonial-list">
        {reviews.map((r) => (
          <blockquote key={r.name} className="testimonial-block">
            {r.text}
            <cite>— {r.name}</cite>
          </blockquote>
        ))}
      </div> */}
    </section>
  );
}

export default Testimonials;