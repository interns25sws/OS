import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import AboutUs from './Components/about.jsx'
import Contact from './Components/Contact.jsx'
import Header from './Components/Header.jsx'
import HomePage from './Components/HomePage.jsx'
import ItemsPage from './Components/ItemsPage.jsx'
import ThirdBody from './Components/Third-Body.jsx'
import HomeAppliances from './Pages/HomeAppliances.jsx'
import MensClothing from './Pages/MensClothing.jsx'
import WomensClothing from './Pages/WomensClothing.jsx'
import ElectronicGadgets from './Pages/ElectronicGadgets.jsx'
import AutomativeEssentials from './Pages/CategoryAutomativeEssentials.jsx'

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
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<AboutUs />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/HomeAppliances" element={<HomeAppliances />} />
        <Route path="/MensClothing" element={<MensClothing />} />
        <Route path='/WomensClothing' element={<WomensClothing />}/>
        <Route path='/ElectronicGadgets' element={<ElectronicGadgets />}/>
        <Route path='/AutomativeEssentials' element={<AutomativeEssentials />}/>
      </Routes>
    </Router>
  )
}

export default App