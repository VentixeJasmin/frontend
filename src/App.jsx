import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <Routes>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      <Route path="/events" element={<Events />} />
    </Routes>
  )
}

export default App
