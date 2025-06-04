import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CenterLayout from './assets/layouts/CenterLayout'
import GridLayout from './assets/layouts/GridLayout'
import Events from './assets/pages/Events'
import EventDetails from './assets/pages/EventDetails'
import Start from './assets/pages/Start'
import SignIn from './assets/pages/SignIn'
import SignUp from './assets/pages/SignUp'
import Verify from './assets/pages/Verify'
import Dashboard from './assets/pages/Dashboard'
import Orders from './assets/pages/Orders'
import OrderDetails from './assets/pages/OrderDetails'
import Venues from './assets/pages/Venues'
import VenueDetails from './assets/pages/VenueDetails'
import AddEvent from './assets/pages/AddEvent'
import AddVenue from './assets/pages/AddVenue'
import { AuthProvider } from "./AuthContext";



function App() {

  return (
    <AuthProvider>
      <BrowserRouter>   
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      
      <Routes> 
        <Route element={<CenterLayout/>}>
          <Route index element={<Start />} />
          <Route path="signin" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="verify" element={<PublicRoute><Verify /></PublicRoute>} />
        </Route>
        <Route element={
              <ProtectedRoute>
                <GridLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/addEvent" element={<AddEvent />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:id" element={<VenueDetails />} />
            <Route path="/venues/addVenue" element={<AddVenue />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Route>
      </Routes>
      
    </BrowserRouter>
  </AuthProvider>
    
  )
}

export default App
