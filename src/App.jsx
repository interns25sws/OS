import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './Components/Header.jsx'
import HomePage from './Components/HomePage.jsx'
import ItemsPage from './Components/ItemsPage.jsx'
import HomeAppliances from './Pages/HomeAppliances.jsx'
import MensClothing from './Pages/MensClothing.jsx'
import WomensClothing from './Pages/WomensClothing.jsx'
import ElectronicGadgets from './Pages/ElectronicGadgets.jsx'
import AutomativeEssentials from './Pages/CategoryAutomativeEssentials.jsx'
import Recommendations from './Components/Recommendations.jsx'
import TrendingProducts from './Components/TrendProducts.jsx'

function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <ItemsPage />
      <TrendingProducts />
      <Recommendations />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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