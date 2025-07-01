import React from 'react';
import KitchenImage from '../assets/kitchenImage.jpg';
import LaundryImage from '../assets/LaundryImage.jpg';
import CleaningImage from '../assets/Cleaning.jpg';
import FurnitureImage from '../assets/Furniture.jpg';
import './CategorySection.css';

function CategorySection() {
  const categories = [
    {
      name: 'Kitchen Appliances',
      image: { src: KitchenImage, alt: 'Kitchen Appliances' },
    },
    {
      name: 'Laundry Essentials',
      image: { src: LaundryImage, alt: 'Laundry Essentials' },
    },
    {
      name: 'Cleaning Solutions',
      image: { src: CleaningImage, alt: 'Cleaning Solutions' },
    },
    {
      name: 'Home',
      image: { src: FurnitureImage, alt: 'Smart Devices' },
    },
  ];

  return (
    <section className="category-section">
      <h2>Explore Our Categories</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.name}>
            <img src={cat.image.src} alt={cat.image.alt} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
