import React from 'react';
import Display1 from '../assets/Images/MensDisplayImage1.jpg';
import Display2 from '../assets/Images/MensDisplayImage2.jpg';
import Display3 from '../assets/images/MensDisplayImage3.jpg';

const items = [
  {
    title: 'Casual Wear',
    image: Display1,
    price: '$49.99'
  },
  {
    title: 'Formal Suits',
    image: Display2,
    price: '$129.99'
  },
  {
    title: 'Smart Jackets',
    image: Display3,
    price: '$89.99'
  },
];

const SummerCollection = () => {
  return (
    <div className="collection-container">
      <h1 className="collection-title">MENS BRANDED COLLECTION</h1>
      <p className="collection-description">Walk With Attitude & Elegance</p>
      <div className="collection-grid">
        {items.map((item, index) => (
          <div className="collection-item" key={index}>
            <img src={item.image} alt={item.title} className="collection-image" />
            <p className="collection-item-title">{item.title}</p>
            <p className="collection-item-price">{item.price}</p>
            <button className="browse-button">Browse Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummerCollection;
