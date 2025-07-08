import React from 'react';
import './CategoryHomeAppliances.css';

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

const categories = [
  { name: 'Smartphones & Tablets', image: SmartphonesTabletsImage },
  { name: 'Laptops & Computers', image: LaptopsComputersImage },
  { name: 'Computer Accessories', image: ComputerAccessoriesImage },
  { name: 'Audio Devices', image: AudioDevicesImage },
  { name: 'Cameras & Photography', image: CamerasPhotographyImage },
  { name: 'Televisions & Entertainment', image: TelevisionsEntertainmentImage },
  { name: 'Portable Power & Charging', image: PortablePowerChargingImage },
  { name: 'Wearables & Fitness Gadgets', image: WearablesFitnessGadgetsImage },
  { name: 'Printers & Office Gadgets', image: PrintersOfficeGadgetsImage },
  { name: 'Smart Appliances', image: SmartAppliancesImage },
  { name: 'VR & AR Devices', image: VRARDevicesImage },
  { name: 'Gaming Accessories', image: GamingAccessoriesImage },
];

function CategoryHomeAppliances() {
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

export default CategoryHomeAppliances;
