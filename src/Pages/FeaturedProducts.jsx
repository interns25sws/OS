import React from "react";
import "./FeaturedProducts.css";
import SamsungImage from "../assets/samsung.jpg"; 

function FeaturedProducts() {
  const products = [
    {
      name: "Samsung Smart Refrigerator",
      price: "$1,299",
      desc: "Wi-Fi enabled, touch screen, energy-efficient",
      image: { src: SamsungImage, alt: "Samsung Smart Refrigerator" },
    },
    {
      name: "LG Front Load Washing Machine",
      price: "$749",
      desc: "TurboWash tech, 10-year warranty, 5-star rated",
      image: "https://www.lg.com/in/images/washing-machines/md07501399/gallery/FHM1408BDL-Washing-Machines-Front-View-D-01.jpg",
    },
    {
      name: "Dyson V11 Vacuum Cleaner",
      price: "$599",
      desc: "Cordless, powerful suction, HEPA filter",
      image: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/268804-01.png",
    },
    {
      name: "Sony Bravia 55\" 4K TV",
      price: "$999",
      desc: "Ultra HD, Google TV, Dolby Vision",
      image: "https://www.sony.com/image/sonyview1.png",
    },
    {
      name: "Philips Air Fryer XXL",
      price: "$299",
      desc: "Fat removal tech, digital display, easy clean",
      image: "https://www.philips.com/c-dam/b2c/category-pages/kitchen/airfryer/airfryer-xxl.png",
    },
    {
      name: "Apple HomePod Mini",
      price: "$99",
      desc: "360° audio, Siri built-in, smart home hub",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-202110?wid=470&hei=556&fmt=png-alpha&.v=1632925511000",
    },
    {
      name: "Mi Smart Air Purifier 4",
      price: "$199",
      desc: "HEPA filter, app control, real-time air quality",
      image: "https://i01.appmifile.com/webfile/globalimg/products/pc/mi-air-purifier-4/section01-01.png",
    },
    {
      name: "Amazon Echo Show 8",
      price: "$129",
      desc: "8\" HD screen, Alexa, video calls, smart home control",
      image: "https://m.media-amazon.com/images/I/61lWl5vY6NL._AC_SL1000_.jpg",
    },
    {
      name: "Bosch Dishwasher Series 4",
      price: "$849",
      desc: "EcoSilence Drive, 12 place settings, AquaStop",
      image: "https://media3.bosch-home.com/Product_Shots/1600x900/MCSA02145598_DW_SPS4HKI60E_def.jpg",
    },
    {
      name: "iRobot Roomba i7+",
      price: "$799",
      desc: "Self-emptying, smart mapping, Wi-Fi connected",
      image: "https://cdn.irobot.com/images/roomba-i7-plus/roomba-i7-plus-hero.png",
    },
    {
      name: "Panasonic Microwave Oven",
      price: "$299",
      desc: "Inverter tech, 27L, auto cook menus",
      image: "https://www.panasonic.com/content/dam/pim/in/en/NN/NN-ST2/NN-ST266BFDG/NN-ST266BFDG-variation-image.png",
    },
    {
      name: "Havells Instant Water Heater",
      price: "$99",
      desc: "3L, rust proof, LED indicator",
      image: "https://www.havells.com/content/dam/havells/consumer/water-heater/instant-water-heater/instanio/instanio-3l/instanio-3l-ivory-white-blue.png",
    },
  ];

  return (
    <section className="featured-section">
      <h2>Featured Products</h2>
      <p>Get all the discounts & offers on home appliances right now!</p>
      {/* <div className="featured-grid">
        {products.map((p) => (
          <div key={p.name} className="featured-product">
            <img src={p.image} alt={p.name} className="product-image" />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <strong>{p.price}</strong>
          </div>
        ))}
      </div> */}
    </section>
  );
}

export default FeaturedProducts;
