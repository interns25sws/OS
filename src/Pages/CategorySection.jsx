import React from 'react';
import './CategorySection.css';

function CategorySection() {
  const categories = ['Kitchen Appliances', 'Laundry Essentials', 'Cleaning Solutions', 'Smart Devices'];

  return (
    <section className="category-section">
      <h2>Explore Our Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>{cat}</li>
        ))}
      </ul>
    </section>
  );
}

export default CategorySection;
