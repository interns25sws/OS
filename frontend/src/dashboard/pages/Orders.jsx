import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const dummyOrders = [
        {
          id: "ORD001",
          customer: "John Doe",
          date: "2025-08-01",
          status: "Shipped",
          total: "$120.00",
        },
        {
          id: "ORD002",
          customer: "Jane Smith",
          date: "2025-08-03",
          status: "Pending",
          total: "$85.50",
        },
        {
          id: "ORD003",
          customer: "Mark Johnson",
          date: "2025-08-04",
          status: "Delivered",
          total: "$200.00",
        },
      ];

      setOrders(dummyOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Create Order
        </button>
      </div>

      {orders.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
