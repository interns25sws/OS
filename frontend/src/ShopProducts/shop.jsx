import React, { useEffect, useState } from "react";
import "./shop.css"; // optional for custom styling

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // Make sure this matches your backend port
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="shop-loading">Loading products...</div>;
  if (error) return <div className="shop-error">{error}</div>;

  return (
    <div className="shop-container-">
      <h1 className="shop-title">Shop Products</h1>
      <div className="product-grid-db">
        {products.map((product) => (
          <div className="product-card-db" key={product._id}>
            <div className="product-image-wrapper">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image-db"
                />
              ) : (
                <div className="no-image">No image</div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Sizes:</strong> {product.sizes.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
