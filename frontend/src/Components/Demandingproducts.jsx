import React from 'react';
import './Mens.css';
import MensTrend from '../assets/menstrend.jpg';
import Shoes from '../assets/Jordan.jpg';
import Womenstrend from '../assets/womentrend.jpg';

const items = [
  {
    title: 'Formal Wear ',
    image: MensTrend,
    price: '$49.99'
  },
  {
    title: 'Air Jordan 1',
    image: Shoes,
    price: '$129.99'
  },
  {
    title: 'Aesthetic Wear',
    image: Womenstrend,
    price: '$89.99'
  },
];

const SummerCollection = () => {
  return (
    <div className="collection-container">
      <h1 className="collection-title">DEMANDING PRODUCTS</h1>
      <p className="collection-description">For those who know what they want.</p>
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
