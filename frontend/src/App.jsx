import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header.jsx";
import HomePage from "./Components/HomePage.jsx";
import DisplayCloth from "./Components/DisplayCloth.jsx"
import MensCloth from "./Components/DisplayMensCloth.jsx"
import WomensCloth from "./Components/DisplayWomenCloth.jsx"
import Recommendations from "./Components/Recommendations.jsx";
import UserLogin from "./Pages/UserLogin.jsx";
import ROUTES from "./Constants/routes.jsx";
import DemandingProdcuts from "./Components/Demandingproducts.jsx"
import HowItWorks from "./Components/HIW.jsx"
import Footer from "./Components/Footer.jsx"

function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <DisplayCloth />
      <MensCloth />
      <WomensCloth />
      <DemandingProdcuts />
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
      </Routes>
    </Router>
  );
}

export default App;
