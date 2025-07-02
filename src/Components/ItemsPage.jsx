import { Link } from "react-router-dom";
import "./ItemsPage.css";
import CartImage from "../assets/HomeAppliance.jpg";
import MensClothing from "../assets/MensClothing.png";
import WomensClothing from "../assets/WomensClothing.jpeg";
import ElectronicGadgets from "../assets/Gadgets.jpeg";
import AutomativeEssentials from "../assets/Automative.jpg"
import Sound from "../assets/Sound.jpg";

export default function ItemsPage() {
  return (
    <section className="cart-section">
      <div className="cart-container">
        <h2 className="cart-title"> Home Appliances</h2>
        <p className="cart-description">
          Appliances for your home | upto 50% discount
        </p>
        <img src={CartImage} alt="" />
        <Link to="/HomeAppliances" className="see-more-btn">
          See More
        </Link>
      </div>
      <div className="cart-container">
        <h2 className="cart-title"> Mens Clothing</h2>
        <p>Mens clothing with proper set | upto 30% discount </p>
        <img src={MensClothing} alt="" />
        <Link to="/MensClothing" className="see-more-btn">
          See More
        </Link>
      </div>
      <div className="cart-container">
        <h2 className="cart-title"> Womens Clothing</h2>
        <p>Mens clothing with proper set | upto 30% discount </p>
        <img src={WomensClothing} alt="" />
        <Link to="/WomensClothing" className="see-more-btn">
          See More
        </Link>
      </div>
      <div className="cart-container">
        <h2 className="cart-title"> Electonic Gadgets</h2>
        <p>Latest gadgets for your family | upto 35% discount </p>
        <img src={ElectronicGadgets} alt="" />
        <Link to="/electonic-gadgets" className="see-more-btn">
          See More
        </Link>
      </div>
      <div className="cart-container">
        <h2 className="cart-title">Automative Essentials</h2>
        <p className="cart-description">
          Automotive essentials your vechiles | Up to 60% off
        </p>
        <img src={AutomativeEssentials} alt="" />
        <Link to="/home-appliances" className="see-more-btn">
          See More
        </Link>
      </div>
      <div className="cart-container">
        <h2 className="cart-title">Sound System</h2>
        <p>All sound wears with all brands| upto 30% discount </p>
        <img src={Sound} alt="" />
        <Link to="/mens-clothing" className="see-more-btn">
          See More
        </Link>
      </div>
      <div className="cart-container">
        <h2 className="cart-title"> Womens Clothing</h2>
        <p>Mens clothing with proper set | upto 30% discount </p>
        <img src={WomensClothing} alt="" />
        <Link to="/womens-clothing" className="see-more-btn">
          See More
        </Link>
      </div>
      <div className="cart-container">
        <h2 className="cart-title"> Electonic Gadgets</h2>
        <p>Latest gadgets for your family| upto 35% discount </p>
        <img src={ElectronicGadgets} alt="" />
        <Link to="/electonic-gadgets" className="see-more-btn">
          See More
        </Link>
      </div>
      
    </section>
  );
}
