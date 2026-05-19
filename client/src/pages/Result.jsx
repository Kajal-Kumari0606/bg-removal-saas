import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const { resultImage, image } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-2">
          Background Removed ✨
        </h1>
        <p className="text-slate-500 text-center mb-12">
          Your image is ready. Download the transparent PNG below.
        </p>

        {/* Image comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Original */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-center">Original</p>
            <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-square flex items-center justify-center shadow-inner">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-slate-400">No image uploaded</p>
              )}
            </div>
          </div>

          {/* Result */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-violet-500 uppercase tracking-wider text-center">Result</p>
            <div className="checkerboard rounded-3xl overflow-hidden aspect-square flex items-center justify-center shadow-inner border-2 border-violet-100">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="Background Removed"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-violet-400 text-sm">Processing with AI...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-2 border-slate-200 text-slate-600 hover:border-slate-300 px-7 py-3.5 rounded-2xl font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Image
          </button>

          {resultImage && (
            <a
              href={resultImage}
              download="bg-removed.png"
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-7 py-3.5 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-200 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PNG
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Result
