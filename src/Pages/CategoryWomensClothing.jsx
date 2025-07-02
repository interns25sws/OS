import React from 'react';
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

function CategoryWomensClothing() {
  const categories = [
    {
      name: 'Tops',
      image: { src: Tops, alt: 'Tops' }
    },
    {
      name: 'Sweaters & Cardigans',
      image: { src: SweatersCardigans, alt: 'Sweaters & Cardigans' },
    },
    {
      name: 'Jackets & Coats',
      image: { src: JacketsCoats, alt: 'Jackets & Coats' },
    },
    {
      name: 'Blazers',
      image: { src: Blazers, alt: 'Blazers' },
    },
    {
      name: 'Dresses',
      image: { src: Dresses, alt: 'Dresses' },
    },
    {
      name: 'Skirts',
      image: { src: Skirts, alt: 'Skirts' },
    },
    {
      name: 'Jeans & Trousers',
      image: { src: JeansTrousers, alt: 'Jeans & Trousers' },
    },
    {
      name: 'Leggings & Jeggings',
      image: { src: LeggingsJeggings, alt: 'Leggings & Jeggings' },
    },
    {
      name: 'Shorts & Capris',
      image: { src: ShortsCapris, alt: 'Shorts & Capris' },
    },
    {
      name: 'Jumpsuits & Rompers',
      image: { src: JumpsuitsRompers, alt: 'Jumpsuits & Rompers' },
    },
    {
      name: 'Activewear',
      image: { src: Activewear, alt: 'Activewear' },
    },
    {
      name: 'Loungewear',
      image: { src: Loungewear, alt: 'Loungewear' },
    },
    {
      name: 'Sleepwear & Pajamas',
      image: { src: SleepwearPajamas, alt: 'Sleepwear & Pajamas' },
    },
    {
      name: 'Lingerie & Intimates',
      image: { src: LingerieIntimates, alt: 'Lingerie & Intimates' },
    },
    {
      name: 'Swimwear',
      image: { src: Swimwear, alt: 'Swimwear' },
    },
    {
      name: 'Ethnic & Traditional Wear',
      image: { src: EthnicTraditionalWear, alt: 'Ethnic & Traditional Wear' },
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

export default CategoryWomensClothing;
