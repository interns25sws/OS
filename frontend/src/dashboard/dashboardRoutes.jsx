import { Route } from "react-router-dom";
import DashboardHome from "./pages/DashboardHome";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Discounts from "./pages/Discounts";

const dashboardRoutes = (
  <Route>
    <Route index element={<DashboardHome />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
    <Route path="discounts" element={<Discounts />} />
  </Route>
);

export default dashboardRoutes;
