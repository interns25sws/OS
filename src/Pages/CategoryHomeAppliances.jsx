import React from 'react';
import './CategoryHomeAppliances.css';

import KitchenImage from '../assets/HomeAppliancesImages/KitchenImage.jpg';
import LaundryImage from '../assets/HomeAppliancesImages/LaundryImage.jpg';
import CleaningImage from '../assets/HomeAppliancesImages/Cleaning.jpg';
import FurnitureImage from '../assets/HomeAppliancesImages/Furniture.jpg';
import AirConditionerImage from '../assets/HomeAppliancesImages/AirConditioner.jpg';
import WaterPurifierImage from '../assets/HomeAppliancesImages/WaterPurifier.jpg';
import HeaterImage from '../assets/HomeAppliancesImages/Geysers.jpg';
import RefrigeratorImage from '../assets/HomeAppliancesImages/Refrigerators.jpg';
import MicrowaveImage from '../assets/HomeAppliancesImages/Microwaves.jpg';
import VacuumCleanerImage from '../assets/HomeAppliancesImages/Vacuum Cleaners.jpg';
import FanImage from '../assets/HomeAppliancesImages/Fans & Coolers.jpg';
import LightingImage from '../assets/HomeAppliancesImages/Lighting Fixtures.jpg';

const categories = [
  { name: 'Kitchen Appliances', image: KitchenImage },
  { name: 'Laundry Essentials', image: LaundryImage },
  { name: 'Cleaning Solutions', image: CleaningImage },
  { name: 'Furniture Products', image: FurnitureImage },
  { name: 'Air Conditioners', image: AirConditionerImage },
  { name: 'Water Purifiers', image: WaterPurifierImage },
  { name: 'Heaters & Geysers', image: HeaterImage },
  { name: 'Refrigerators', image: RefrigeratorImage },
  { name: 'Microwaves', image: MicrowaveImage },
  { name: 'Vacuum Cleaners', image: VacuumCleanerImage },
  { name: 'Fans & Coolers', image: FanImage },
  { name: 'Lighting Fixtures', image: LightingImage },
];

function CategoryHomeAppliances() {
  return (
    <section className="category-section">
      <h2 className="category-heading">Explore Our Categories</h2>
      <div className="category-grid">
        {categories.map(({ name, image }) => (
          <div className="category-card" key={name}>
            <img src={image} alt={name} className="fade-in" />
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryHomeAppliances;
