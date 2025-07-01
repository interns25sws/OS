import React from "react";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const products = [
    {
      name: "Samsung Smart Refrigerator",
      price: "$1,299",
      desc: "Wi-Fi enabled, touch screen, energy-efficient",
      image: "https://images.samsung.com/is/image/samsung/p6pim/in/rs74t5f01b4-tl/gallery/in-side-by-side-refrigerator-rs8000-rs74t5f01b4-tl-530347978?$650_519_PNG$",
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
  ];

  return (
    <section className="featured-section">
      <h2>Featured Products</h2>
      <div className="featured-grid">
        {products.map((p) => (
          <div key={p.name} className="featured-product">
            <img src={p.image} alt={p.name} className="product-image" />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <strong>{p.price}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
