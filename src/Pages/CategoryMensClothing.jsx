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

const categories = [
  { name: 'T-Shirts & Polos', image: PoloTshirts },
  { name: 'Casual Shirts', image: Casualshirts },
  { name: 'Formal Shirts', image: FormalShirts },
  { name: 'Jeans & Trousers', image: jeansImage },
  { name: 'Jackets & Coats', image: JacketsImage },
  { name: 'Sweatshirts & Hoodies', image: HoodiesImage },
  { name: 'Shorts & Bermudas', image: ShortsImage },
  { name: 'Activewear', image: ActiveWearImage },
  { name: 'Suits & Blazers', image: SuitsImage },
  { name: 'Joggers & Sweatpants', image: JoggersImage },
  { name: 'Pants & Chinos', image: PantsImage },
  { name: 'Sleepwear & Loungewear', image: SleepWearImage },
  { name: 'Innerwear', image: InnerWear },
  { name: 'Ethnic Wear', image: EthnicWear },
  { name: 'Accessories', image: AccessoriesImage },
  { name: 'Footwear', image: FootWearImage },
];

function CategoryMensClothing() {
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

export default CategoryMensClothing;
