import React from "react";
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

import UserLogin from "./Pages/UserLogin.jsx";
import Cart from "./Pages/Cart.jsx";
import Shop from "./ShopProducts/shop.jsx"
import ROUTES from "./Constants/routes.jsx";

function Home() {
  return (
    <>
      <Header />
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
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.USER_LOGIN} element={<UserLogin />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.SHOP} element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
