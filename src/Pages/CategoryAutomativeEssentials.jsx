import React from "react";
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
import "./CategoryHomeAppliances.css";

function CategoryHomeAppliances() {
  const categories = [
    {
      name: "Car Care & Cleaning",
      image: { src: CarCleaningImage, alt: "Car Care & Cleaning" },
    },
    {
      name: "Interior Accessories",
      image: { src: InteriorAccessoriesImage, alt: "Interior Accessories" },
    },
    {
      name: "Exterior Accessories",
      image: { src: ExteriorAccessoriesImage, alt: "Exterior Accessories" },
    },
    {
      name: "Car Electronics",
      image: { src: CarElectronicsImage, alt: "Car Electronics" },
    },
    {
      name: "Tools & Maintenance",
      image: { src: ToolsMaintenanceImage, alt: "Tools & Maintenance" },
    },
    {
      name: "Lighting & Bulbs",
      image: { src: LightingImage, alt: "Lighting & Bulbs" },
    },
    {
      name: "Safety & Emergency Gear",
      image: { src: SafetyGearImage, alt: "Safety & Emergency Gear" },
    },
    {
      name: "Performance & Engine Add-ons",
      image: { src: PerformanceImage, alt: "Performance & Engine Add-ons" },
    },
    {
      name: "Tires & Wheel Accessories",
      image: { src: TiresImage, alt: "Tires & Wheel Accessories" },
    },
    {
      name: "Car Chargers & Mobile Holders",
      image: { src: CarChargersImage, alt: "Car Chargers & Mobile Holders" },
    },
    {
      name: "Motor Oils & Fluids",
      image: { src: MotorOilImage, alt: "Motor Oils & Fluids" },
    },
    {
      name: "Battery & Electrical",
      image: { src: BatteryImage, alt: "Battery & Electrical" },
    },
  ];

  return (
    <section className="category-section">
      <h2 className="category-heading">Explore Our Categories</h2>
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
