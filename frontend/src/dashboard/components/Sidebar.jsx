import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/dashboard/products" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Discounts", path: "/dashboard/discounts" },
    { name: "Users", path: "/dashboard/users" },
  ];

  return (
    <aside
      className={`
        bg-[#1e1e2f] text-white fixed top-0 left-0 h-screen w-60 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}
    >
      <div className="p-5 border-r border-[#333] h-full flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#00bfff] border-b border-[#333] pb-2">
          Admin Panel
        </h2>
        <ul className="flex-1 space-y-3">
          {links.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    block px-5 py-3 rounded-md font-medium transition-all duration-300
                    ${isActive ? "bg-[#2d2d4f] border-l-4 border-[#00bfff]" : ""}
                    ${!isActive && isHovered ? "bg-[#2a2a40]" : ""}
                    ${!isActive ? "border-l-4 border-transparent" : ""}
                  `}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
