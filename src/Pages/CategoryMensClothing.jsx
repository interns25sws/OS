import React from 'react';
import PoloTshirts from '../assets/MensClothingImages/PoloTshirt.jpg';
import Casualshirts from '../assets/MensClothingImages/CasualShirts.jpg';
import FormalShirts from '../assets/MensClothingImages/FormalShirts.jpg';
import jeansImage from '../assets/MensClothingImages/Jeans.jpg';
import JacketsImage from '../assets/MensClothingImages/Jackets.jpg';
import HoodiesImage from '../assets/MensClothingImages/Hoodies.jpg';
import ShortsImage from '../assets/MensClothingImages/Shorts.webp';
import ActiveWearImage from '../assets/MensClothingImages/ActiveWear.jpg';
import SuitsImage from '../assets/MensClothingImages/Suits.jpg';
import JoggersImage from '../assets/MensClothingImages/Joggers.jpg';
import PantsImage from '../assets/MensClothingImages/Pants.jpg';
import SleepWearImage from '../assets/MensClothingImages/SleepWear.webp';
import EthnicWear from '../assets/MensClothingImages/EthnicWear.jpg';
import InnerWear from '../assets/MensClothingImages/InnerWear.jpg';
import AccessoriesImage from '../assets/MensClothingImages/Accessrios.jpg';
import FootWearImage from '../assets/MensClothingImages/FootWear.webp';
import './CategoryMensClothing.css';
// import HomeAppliances from './HomeAppliances';

function CategoryMensClothing() {
  const categories = [
    {
      name: 'T-Shirts & Polos',
      image: { src: PoloTshirts, alt: 'T-Shirts & Polos' },
    },
    {
      name: 'Casual Shirts',
      image: { src: Casualshirts, alt: 'Casual Shirts' },
    },
    {
      name: 'Formal Shirts',
      image: { src: FormalShirts, alt: 'Formal Shirts' },
    },
    {
      name: 'Jeans & Trousers',
      image: { src: jeansImage, alt: 'Jeans & Trousers' },
    },
    {
      name: 'Jackets & Coats',
      image: { src: JacketsImage, alt: 'Jackets & Coats' },
    },
    {
      name: 'Sweatshirts & Hoodies',
      image: { src: HoodiesImage, alt: 'Sweatshirts & Hoodies' },
    },
    {
      name: 'Shorts & Bermudas',
      image: { src: ShortsImage, alt: 'Shorts & Bermudas' },
    },
    {
      name: 'Activewear',
      image: { src: ActiveWearImage, alt: 'Activewear' },
    },
    {
      name: 'Suits & Blazers',
      image: { src: SuitsImage, alt: 'Suits & Blazers' },
    },
    {
      name: 'Joggers & Sweatpants',
      image: { src: JoggersImage, alt: 'Joggers & Sweatpants' },
    },
    {
      name: 'Pants & Chinos',
      image: { src: PantsImage, alt: 'Pants & Chinos' },
    },
    {
      name: 'Sleepwear & Loungewear',
      image: { src: SleepWearImage, alt: 'Sleepwear & Loungewear' },
    },
    {
      name: 'Innerwear',
      image: { src: EthnicWear, alt: 'Innerwear' },
    },
    {
      name: 'Ethnic Wear',
      image: { src: InnerWear, alt: 'Ethnic Wear' },
    },
    {
      name: 'Accessories',
      image: { src: AccessoriesImage, alt: 'Accessories ' },
    },
    {
      name: 'Footwear',
      image: { src: FootWearImage, alt: 'Footwear' },
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

export default CategoryMensClothing;
