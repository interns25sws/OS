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

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/summary");
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching dashboard summary", error);
      } finally {
        setLoading(false);
      }
    };

    if (isHomePage) fetchSummary();
  }, [isHomePage]);

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-300 fixed top-0 bottom-0 left-0 z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-60 flex flex-col w-[calc(100%-240px)] h-screen">
        {/* Topbar */}
        <div className="h-16 bg-white border-b border-gray-300 sticky top-0 z-20 flex items-center px-6">
          <Topbar />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
          {isHomePage && (
            <>
              {/* Welcome Section */}
              <div className="mb-6">
                <h1 className="text-2xl font-semibold">Welcome Back 👋</h1>
                <p className="text-gray-600 mt-1">
                  Here's what's happening in your store today.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="flex gap-5 mt-5">
                {loading ? (
                  <div className="text-gray-500">Loading summary...</div>
                ) : (
                  <>
                    <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-200 text-center">
                      <h3 className="text-xl font-bold">{summary.products}</h3>
                      <p className="text-gray-600 mt-1">Products</p>
                    </div>
                    <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-200 text-center">
                      <h3 className="text-xl font-bold">{summary.orders}</h3>
                      <p className="text-gray-600 mt-1">Orders</p>
                    </div>
                    <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-200 text-center">
                      <h3 className="text-xl font-bold">{summary.customers}</h3>
                      <p className="text-gray-600 mt-1">Customers</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* Nested Route Content */}
          <div className={`${isHomePage ? "mt-8" : "mt-0"}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
