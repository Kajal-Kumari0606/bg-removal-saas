import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  const { credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
            BgRemover<span className="text-slate-800">AI</span>
          </span>
        </Link>

        {/* Right Side */}
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-violet-50 hover:bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              {credit} Credits
            </button>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => openSignIn()}
              className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
