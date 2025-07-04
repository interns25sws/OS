import React from "react";
import "./CategoryHomeAppliances.css";

import CarCleaningImage from "../assets/AutomativeEssentialsImages/CarCleaning.jpeg";
import InteriorAccessoriesImage from "../assets/AutomativeEssentialsImages/Interior.jpeg";
import ExteriorAccessoriesImage from "../assets/AutomativeEssentialsImages/Exterior.jpeg";
import CarElectronicsImage from "../assets/AutomativeEssentialsImages/Filters.jpeg";
import ToolsMaintenanceImage from "../assets/AutomativeEssentialsImages/Tools.jpeg";
import LightingImage from "../assets/AutomativeEssentialsImages/Bulbs.jpeg";
import SafetyGearImage from "../assets/AutomativeEssentialsImages/SafetyGears.jpeg";
import PerformanceImage from "../assets/AutomativeEssentialsImages/CarElectronic.jpeg";
import TiresImage from "../assets/AutomativeEssentialsImages/Tires.jpeg";
import CarChargersImage from "../assets/AutomativeEssentialsImages/CarCharger.jpeg";
import MotorOilImage from "../assets/AutomativeEssentialsImages/MotorOil.jpeg";
import BatteryImage from "../assets/AutomativeEssentialsImages/Battery.jpeg";

const categories = [
  { name: "Car Care & Cleaning", image: CarCleaningImage },
  { name: "Interior Accessories", image: InteriorAccessoriesImage },
  { name: "Exterior Accessories", image: ExteriorAccessoriesImage },
  { name: "Car Electronics", image: CarElectronicsImage },
  { name: "Tools & Maintenance", image: ToolsMaintenanceImage },
  { name: "Lighting & Bulbs", image: LightingImage },
  { name: "Safety & Emergency Gear", image: SafetyGearImage },
  { name: "Performance & Engine Add-ons", image: PerformanceImage },
  { name: "Tires & Wheel Accessories", image: TiresImage },
  { name: "Car Chargers & Mobile Holders", image: CarChargersImage },
  { name: "Motor Oils & Fluids", image: MotorOilImage },
  { name: "Battery & Electrical", image: BatteryImage },
];

function CategoryAutomotiveEssentials() {
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

export default CategoryAutomotiveEssentials;
