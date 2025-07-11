import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header.jsx";
import HomePage from "./Components/HomePage.jsx";
import DisplayCloth from "./Components/DisplayCloth.jsx";
import Categories from "./Components/Categories.jsx";
import MensCloth from "./Components/DisplayMensCloth.jsx";
import WomensCloth from "./Components/DisplayWomenCloth.jsx";
import DemandingProducts from "./Components/DemandingProducts.jsx";
import Combination from "./Components/Combination.jsx";
import HowItWorks from "./Components/HIW.jsx";
import Recommendations from "./Components/Recommendations.jsx";
import Footer from "./Components/Footer.jsx";

import Login from "./Pages/login.jsx";
import Cart from "./Pages/Cart.jsx";
import Shop from "./ShopProducts/shop.jsx";
import Profile from "./Pages/profile.jsx";
import ROUTES from "./Constants/routes.jsx";

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
      <Recommendations />
      <Footer />
    </>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home loggedInUser={loggedInUser} />} />
        <Route path={ROUTES.USER_LOGIN} element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.SHOP} element={<Shop />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
