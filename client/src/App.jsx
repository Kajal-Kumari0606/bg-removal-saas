import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useUser } from '@clerk/clerk-react'
import { AppContext } from './context/AppContext'
import { useEffect } from 'react'

const App = () => {
  const { isSignedIn } = useUser()
  const { loadCreditsData } = useContext(AppContext)

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData()
    }
  }, [isSignedIn])

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="bottom-right" />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
