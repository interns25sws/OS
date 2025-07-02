import React from 'react';
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
import './CategoryHomeAppliances.css';
// import HomeAppliances from './HomeAppliances';

function CategoryHomeAppliances() {
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
      name: 'Furniture Products',
      image: { src: FurnitureImage, alt: 'Furniture Products' },
    },
    {
      name: 'Air Conditioners',
      image: { src: AirConditionerImage, alt: 'Air Conditioners' },
    },
    {
      name: 'Water Purifiers',
      image: { src: WaterPurifierImage, alt: 'Water Purifiers' },
    },
    {
      name: 'Heaters & Geysers',
      image: { src: HeaterImage, alt: 'Heaters & Geysers' },
    },
    {
      name: 'Refrigerators',
      image: { src: RefrigeratorImage, alt: 'Refrigerators' },
    },
    {
      name: 'Microwaves',
      image: { src: MicrowaveImage, alt: 'Microwaves' },
    },
   
    {
      name: 'Vacuum Cleaners',
      image: { src: VacuumCleanerImage, alt: 'Vacuum Cleaners' },
    },
    {
      name: 'Fans & Coolers',
      image: { src: FanImage , alt: 'Fans & Coolers' },
    },
    {
      name: 'Lighting Fixtures',
      image: { src: LightingImage, alt: 'Lighting Fixtures' },
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

export default CategoryHomeAppliances;
