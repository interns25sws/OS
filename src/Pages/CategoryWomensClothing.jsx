import React from 'react';
import './CategoryHomeAppliances.css'; 

import Tops from '../assets/WomensClothingImages/Tops.jpeg';
import SweatersCardigans from '../assets/WomensClothingImages/Sweaters.jpeg';
import JacketsCoats from '../assets/WomensClothingImages/Coats.jpeg';
import Blazers from '../assets/WomensClothingImages/BlazersImage.jpeg';
import Dresses from '../assets/WomensClothingImages/Dreses.jpeg';
import Skirts from '../assets/WomensClothingImages/Skirts.jpeg';
import JeansTrousers from '../assets/WomensClothingImages/Trousers.jpeg';
import LeggingsJeggings from '../assets/WomensClothingImages/Leggings.jpeg';
import ShortsCapris from '../assets/WomensClothingImages/Capries.jpeg';
import JumpsuitsRompers from '../assets/WomensClothingImages/Jumpsuits.jpeg';
import Activewear from '../assets/WomensClothingImages/ActiveWear.jpeg';
import Loungewear from '../assets/WomensClothingImages/Lounge.jpeg';
import SleepwearPajamas from '../assets/WomensClothingImages/Pajamas.jpeg';
import LingerieIntimates from '../assets/WomensClothingImages/LingeriaImages.jpeg';
import Swimwear from '../assets/WomensClothingImages/SwimWear.jpeg';
import EthnicTraditionalWear from '../assets/WomensClothingImages/EthnicWear.jpeg';

const categories = [
  { name: 'Tops', image: Tops },
  { name: 'Sweaters & Cardigans', image: SweatersCardigans },
  { name: 'Jackets & Coats', image: JacketsCoats },
  { name: 'Blazers', image: Blazers },
  { name: 'Dresses', image: Dresses },
  { name: 'Skirts', image: Skirts },
  { name: 'Jeans & Trousers', image: JeansTrousers },
  { name: 'Leggings & Jeggings', image: LeggingsJeggings },
  { name: 'Shorts & Capris', image: ShortsCapris },
  { name: 'Jumpsuits & Rompers', image: JumpsuitsRompers },
  { name: 'Activewear', image: Activewear },
  { name: 'Loungewear', image: Loungewear },
  { name: 'Sleepwear & Pajamas', image: SleepwearPajamas },
  { name: 'Lingerie & Intimates', image: LingerieIntimates },
  { name: 'Swimwear', image: Swimwear },
  { name: 'Ethnic & Traditional Wear', image: EthnicTraditionalWear },
];

function CategoryWomensClothing() {
  return (
    <section className="category-section">
      <h2 className="category-heading">Explore Our Categories</h2>
      <div className="category-grid">
        {categories.map(({ name, image }) => (
          <div className="category-card" key={name}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryWomensClothing;
