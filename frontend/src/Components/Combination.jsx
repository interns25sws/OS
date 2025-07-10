import React from 'react';
import './Combination.css';
import KoreaLook from "../assets/Images/Korealook.jpg";
import TexturedPolos from "../assets/Images/texturepolos.jpg";
import Plaidshirts from "../assets/Images/plaidshirts.jpg";
import ClassicBottoms from "../assets/Images/classicbottom.jpg";
import UrbanShirt from "../assets/Images/urbanshirt.jpg"
import BlazeSneakers from "../assets/Images/blaze sneakers.jpg"

const items = [
  {
    image: KoreaLook,
    alt: "Korean Look",
  },
  {
    image: TexturedPolos,
    alt: "Textured Polos",
  },
  {
    image: Plaidshirts,
    alt: "Plaid Shirts",
  },
  {
    image: ClassicBottoms,
    alt: "Classic Bottoms",
  },
  {
    image: UrbanShirt,
    alt: "Urban Shirts",
  },
  {
    image: BlazeSneakers,
    alt: "Blaze Sneakers",
  },
];

const SharpDressing = () => {
  return (
    <div className="sharp-dressing-container">
      <h2 className="heading">SHARP DRESSING</h2>
      <div className="cards-container">
        {items.map(({ image, alt }, index) => (
          <div key={index} className="card-sharp">
            <img src={image} alt={alt} className="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharpDressing;
