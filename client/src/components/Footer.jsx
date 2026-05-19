import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg"></div>
          <span className="text-white font-semibold">BgRemoverAI</span>
        </div>
        <p className="text-sm">© 2024 BgRemoverAI. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/buy" className="hover:text-white transition-colors">Pricing</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
