import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardHome = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/dashboard";

  const [summary, setSummary] = useState({
    products: 0,
    orders: 0,
    customers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [productRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products", headers),
          axios.get("http://localhost:5000/api/users", headers),
        ]);

        setSummary({
          products: productRes.data.length,
          customers: userRes.data.length,
          orders: 0, // Replace later
        });
      } catch (error) {
        console.error("Error fetching dashboard summary", error);
      } finally {
        setLoading(false);
      }
    };

    if (isHomePage) fetchSummary();
  }, [isHomePage]);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black bg-opacity-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-300 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0`}
      >
        <Sidebar />
      </aside>

      {/* Content */}
      <div className="flex flex-col flex-1 w-full h-full">
        {/* Topbar with sidebar toggle */}
        <Topbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 bg-gray-100">
          {isHomePage && (
            <>
              <section className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Welcome Back 👋</h1>
                <p className="text-gray-600 mt-1">Here's what's happening in your store today.</p>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <div className="col-span-full text-center text-gray-500">
                    <div className="animate-pulse">Loading summary...</div>
                  </div>
                ) : (
                  <>
                    <SummaryCard title="Products" value={summary.products} />
                    <SummaryCard title="Orders" value={summary.orders} />
                    <SummaryCard title="Customers" value={summary.customers} />
                  </>
                )}
              </section>
            </>
          )}

          <div className={isHomePage ? "mt-8" : ""}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center transition hover:shadow-md">
    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    <p className="text-gray-600 mt-2">{title}</p>
  </div>
);

export default DashboardHome;
