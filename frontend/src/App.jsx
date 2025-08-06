import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";
import Header from "./Components/Header.jsx";
import HomePage from "./Components/HomePage.jsx";
import DisplayCloth from "./Components/DisplayCloth.jsx";
import Categories from "./Components/Categories.jsx";
import MensCloth from "./Components/DisplayMensCloth.jsx";
import WomensCloth from "./Components/DisplayWomenCloth.jsx";
import DemandingProducts from "./Components/DemandingProducts.jsx";
import Combination from "./Components/Combination.jsx";
import HowItWorks from "./Components/HIW.jsx";
import Footer from "./Components/Footer.jsx";

import UserAuth from "./Pages/login.jsx";
import Cart from "./Pages/Cart.jsx";
import Shop from "./ShopProducts/shop.jsx";
import Profile from "./Pages/profile.jsx";
import ROUTES from "./Constants/routes.jsx";
import Checkout from "./Pages/Checkout.jsx";

import Dashboard from "./dashboard/pages/DashboardHome.jsx";
import Products from "./dashboard/pages/Products.jsx";
import AddProduct from "./dashboard/pages/AddProduct.jsx";
import Orders from "./dashboard/pages/Orders.jsx";
import Discounts from "./dashboard/pages/Discounts.jsx";
import Users from "./dashboard/pages/Users.jsx";
import EditProduct from "./dashboard/pages/EditProduct.jsx";
import CategoryProducts from "./Pages/CategoryProducts.jsx";

function Home({ loggedInUser }) {
  return (
    <>
      <Header loggedInUser={loggedInUser} />
      <HomePage />
      <DisplayCloth />
      <Categories />
      <MensCloth />
      <WomensCloth />
      <DemandingProducts />
      <Combination />
      <HowItWorks />
      <Footer />
    </>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Home loggedInUser={loggedInUser} />}
        />
        <Route
          path={ROUTES.USER_LOGIN}
          element={<UserAuth setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <Profile user={loggedInUser} setLoggedInUser={setLoggedInUser} />
          }
        />
        <Route path={ROUTES.CART} element={<Cart user={loggedInUser} />} />
        <Route path={ROUTES.SHOP} element={<Shop user={loggedInUser} />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.CATEGORYNAME} element={<CategoryProducts />} />
        

        <Route path={ROUTES.DASHBOARD} element={<Dashboard />}>
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.ORDERS} element={<Orders />} />
          <Route path={ROUTES.DISCOUNTS} element={<Discounts />} />
          <Route path={ROUTES.USERS} element={<Users />} />
        </Route>
        <Route path={ROUTES.ADDPRODUCT} element={<AddProduct />} />
        <Route path={ROUTES.EDITPRODUCT} element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
