import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header.jsx";
import HomePage from "./Components/HomePage.jsx";
import ItemsPage from "./Components/ItemsPage.jsx";
import HomeAppliances from "./Pages/HomeAppliances.jsx";
import MensClothing from "./Pages/MensClothing.jsx";
import WomensClothing from "./Pages/WomensClothing.jsx";
import ElectronicGadgets from "./Pages/ElectronicGadgets.jsx";
import AutomativeEssentials from "./Pages/CategoryAutomativeEssentials.jsx";
import Recommendations from "./Components/Recommendations.jsx";
import TrendingProducts from "./Components/TrendProducts.jsx";
import UserLogin from "./Pages/UserLogin.jsx";
import ROUTES from "./Constants/routes.jsx";

function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <ItemsPage />
      <TrendingProducts />
      <Recommendations />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.HOME_APPLIANCES} element={<HomeAppliances />} />
        <Route path={ROUTES.MENS_CLOTHING} element={<MensClothing />} />
        <Route path={ROUTES.WOMENS_CLOTHING} element={<WomensClothing />} />
        <Route
          path={ROUTES.ELECTRONIC_GADGETS}
          element={<ElectronicGadgets />}
        />
        <Route
          path={ROUTES.AUTOMOTIVE_ESSENTIALS}
          element={<AutomativeEssentials />}
        />
        <Route path={ROUTES.USER_LOGIN} element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
