import React from 'react';
import SmartphonesTabletsImage from '../assets/ElectronicGadgetsImages/SmartPhone.jpeg';
import LaptopsComputersImage from '../assets/ElectronicGadgetsImages/Laptop.jpeg';
import ComputerAccessoriesImage from '../assets/ElectronicGadgetsImages/Accesserios.jpeg';
import AudioDevicesImage from '../assets/ElectronicGadgetsImages/Audio.jpeg';
import CamerasPhotographyImage from '../assets/ElectronicGadgetsImages/Camera.jpeg';
import TelevisionsEntertainmentImage from '../assets/ElectronicGadgetsImages/Television.jpeg';
import PortablePowerChargingImage from '../assets/ElectronicGadgetsImages/PowerBank.jpeg';
import WearablesFitnessGadgetsImage from '../assets/ElectronicGadgetsImages/Fitness.jpeg';
import PrintersOfficeGadgetsImage from '../assets/ElectronicGadgetsImages/Printer.jpeg';
import SmartAppliancesImage from '../assets/ElectronicGadgetsImages/KitchenGadgets.jpeg';
import VRARDevicesImage from '../assets/ElectronicGadgetsImages/ARVR.jpeg';
import GamingAccessoriesImage from '../assets/ElectronicGadgetsImages/Gaming.jpeg';
import './CategoryHomeAppliances.css';

function CategoryHomeAppliances() {
  const categories = [
    {
      name: 'Smartphones & Tablets',
      image: { src: SmartphonesTabletsImage, alt: 'Smartphones & Tablets' },
    },
    {
      name: 'Laptops & Computers',
      image: { src: LaptopsComputersImage, alt: 'Laptops & Computers' },
    },
    {
      name: 'Computer Accessories',
      image: { src: ComputerAccessoriesImage, alt: 'Computer Accessories' },
    },
    {
      name: 'Audio Devices',
      image: { src: AudioDevicesImage, alt: 'Audio Devices' },
    },
    {
      name: 'Cameras & Photography',
      image: { src: CamerasPhotographyImage, alt: 'Cameras & Photography' },
    },
    {
      name: 'Televisions & Entertainment',
      image: { src: TelevisionsEntertainmentImage, alt: 'Televisions & Entertainment' },
    },
    {
      name: 'Portable Power & Charging',
      image: { src: PortablePowerChargingImage, alt: 'Portable Power & Charging' },
    },
    {
      name: 'Wearables & Fitness Gadgets',
      image: { src: WearablesFitnessGadgetsImage, alt: 'Wearables & Fitness Gadgets' },
    },
    {
      name: 'Printers & Office Gadgets',
      image: { src: PrintersOfficeGadgetsImage, alt: 'Printers & Office Gadgets' },
    },
    {
      name: 'Smart Appliances',
      image: { src: SmartAppliancesImage, alt: 'Smart Appliances' },
    },
    {
      name: 'VR & AR Devices',
      image: { src: VRARDevicesImage, alt: 'VR & AR Devices' },
    },
    {
      name: 'Gaming Accessories',
      image: { src: GamingAccessoriesImage, alt: 'Gaming Accessories' },
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
