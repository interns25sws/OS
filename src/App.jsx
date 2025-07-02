import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from 'react'
import Header from './Components/Header.jsx'
import HomePage from './Components/HomePage.jsx'
import ItemsPage from './Components/ItemsPage.jsx'
import ThirdBody from './Components/Third-Body.jsx'
import AboutUs from './Components/about.jsx'
import Contact from './Components/Contact.jsx'
import HomeAppliances from './Pages/HomeAppliances.jsx'
import MensClothing from './Pages/MensClothing.jsx'
import './App.css'

function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <ItemsPage />
      {/* <ThirdBody /> */}
      {/* <AboutUs /> */}
      {/* <Contact /> */}
    </>
  )
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<AboutUs />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/HomeAppliances" element={<HomeAppliances />} />
        <Route path="/MensClothing" element={<MensClothing />} />
      </Routes>
    </Router>
  )
};

export default App