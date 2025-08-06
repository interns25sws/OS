import React, { useState, useEffect } from "react";

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const dummyDiscounts = [
        {
          id: 1,
          name: "Summer Sale",
          type: "Percentage",
          value: "20%",
          startDate: "2025-08-01",
          endDate: "2025-08-15",
        },
        {
          id: 2,
          name: "Buy 1 Get 1",
          type: "BOGO",
          value: "Free Item",
          startDate: "2025-08-05",
          endDate: "2025-08-31",
        },
      ];
      setDiscounts(dummyDiscounts);
    };

    fetchDiscounts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Discounts</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Create Discount
        </button>
      </div>

      {discounts.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr
                  key={discount.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{discount.name}</td>
                  <td className="px-6 py-4">{discount.type}</td>
                  <td className="px-6 py-4">{discount.value}</td>
                  <td className="px-6 py-4">{discount.startDate}</td>
                  <td className="px-6 py-4">{discount.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No discounts available.</p>
      )}
    </div>
  );
};

export default Discounts;
