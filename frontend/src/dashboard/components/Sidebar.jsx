import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const styles = {
    container: {
      width: "240px",
      height: "100vh",
      backgroundColor: "#1e1e2f",
      color: "#fff",
      padding: "20px",
      boxSizing: "border-box",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #333",
    },
    heading: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "32px",
      textAlign: "center",
      color: "#00bfff",
      borderBottom: "1px solid #333",
      paddingBottom: "10px",
    },
    navList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      flexGrow: 1,
    },
    navItem: {
      marginBottom: "12px",
      borderRadius: "6px",
      overflow: "hidden",
    },
    link: (path) => ({
      textDecoration: "none",
      color: "#fff",
      fontSize: "16px",
      fontWeight: 500,
      padding: "12px 20px",
      display: "block",
      backgroundColor:
        location.pathname === path
          ? "#2d2d4f"
          : hoveredItem === path
          ? "#2a2a40"
          : "transparent",
      borderLeft: location.pathname === path ? "4px solid #00bfff" : "4px solid transparent",
      transition: "all 0.3s ease",
    }),
  };

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/dashboard/products" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Discounts", path: "/dashboard/discounts" },
    { name: "Users", path: "/dashboard/users" },
  ];

  return (
    <aside style={styles.container}>
      <h2 style={styles.heading}>Admin Panel</h2>
      <ul style={styles.navList}>
        {links.map((item) => (
          <li key={item.name} style={styles.navItem}>
            <Link
              to={item.path}
              style={styles.link(item.path)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
