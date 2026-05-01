import { BrowserRouter, Routes, Route, 
         Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

// Pages
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Assessment from './pages/Assessment'
import Dashboard from './pages/Dashboard'
import CheckIn from './pages/CheckIn'
import BurnoutScore from './pages/BurnoutScore'
import Agents from './pages/Agents'
import Suggestions from './pages/Suggestions'
import Emergency from './pages/Emergency'
import Journal from './pages/Journal'
import Counselor from './pages/Counselor'

// Components
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'

function AppRoutes() {
  const { user } = useApp()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : 
                         <Navigate to="/" />} 
        />
        <Route 
          path="/checkin" 
          element={user ? <CheckIn /> : 
                         <Navigate to="/" />} 
        />
        <Route 
          path="/burnout" 
          element={user ? <BurnoutScore /> : 
                         <Navigate to="/" />} 
        />
        <Route 
          path="/agents" 
          element={user ? <Agents /> : 
                         <Navigate to="/" />} 
        />
        <Route 
          path="/suggestions" 
          element={user ? <Suggestions /> : 
                         <Navigate to="/" />} 
        />
        <Route 
          path="/emergency" 
          element={<Emergency />} 
        />
        <Route 
          path="/journal" 
          element={user ? <Journal /> : 
                         <Navigate to="/" />} 
        />
        <Route 
          path="/counselor" 
          element={<Counselor />} 
        />
      </Routes>
      <BottomNav />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-brand-900">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}