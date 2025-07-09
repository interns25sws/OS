import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header.jsx";
import HomePage from "./Components/HomePage.jsx";
import Description from "./Components/Desscription.jsx";
import DisplayCloth from "./Components/DisplayCloth.jsx"
import MensCloth from "./Components/DisplayMensCloth.jsx"
import WomensCloth from "./Components/DisplayWomenCloth.jsx"
import ItemsPage from "./Components/ItemsPage.jsx";
import MensClothing from "./Pages/MensClothing.jsx";
import WomensClothing from "./Pages/WomensClothing.jsx";
import Recommendations from "./Components/Recommendations.jsx";
import TrendingProducts from "./Components/TrendProducts.jsx";
import UserLogin from "./Pages/UserLogin.jsx";
import ROUTES from "./Constants/routes.jsx";
import DemandingProdcuts from "./Components/Demandingproducts.jsx"

function Home() {
  return (
    <>
      <Header />
      <HomePage />
      {/* <Description /> */}
      <DisplayCloth />
      <MensCloth />
      <WomensCloth />
      <DemandingProdcuts />
      {/* <ItemsPage /> */}
      {/* <TrendingProducts /> */}
      <Recommendations />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        {/* <Route path={ROUTES.MENS_CLOTHING} element={<MensClothing />} /> */}
        {/* <Route path={ROUTES.WOMENS_CLOTHING} element={<WomensClothing />} /> */}
        <Route path={ROUTES.USER_LOGIN} element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
