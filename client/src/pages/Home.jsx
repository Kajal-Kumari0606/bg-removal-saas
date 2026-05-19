import React, { useContext, useRef } from 'react'
import { useClerk } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const { removeBg } = useContext(AppContext)
  const { openSignIn } = useClerk()
  const inputRef = useRef(null)

  const beforeAfterExamples = [
    { id: 1, label: 'Portrait' },
    { id: 2, label: 'Product' },
    { id: 3, label: 'Object' },
  ]

  const steps = [
    {
      icon: '📤',
      title: 'Upload Your Image',
      desc: 'Drag & drop or click to upload any JPG, PNG or WEBP image'
    },
    {
      icon: '🤖',
      title: 'AI Processes It',
      desc: 'Our AI instantly detects and removes the background with precision'
    },
    {
      icon: '⬇️',
      title: 'Download Result',
      desc: 'Download your image with transparent background as PNG'
    },
  ]

  const reviews = [
    { name: 'Riya Sharma', role: 'Product Designer', text: 'Incredible accuracy! Saved me hours of Photoshop work.', rating: 5 },
    { name: 'Arjun Mehta', role: 'E-commerce Owner', text: 'We process hundreds of product photos daily. This is a game changer.', rating: 5 },
    { name: 'Priya Nair', role: 'Photographer', text: 'The edge detection on hair and complex backgrounds is outstanding.', rating: 5 },
  ]

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) removeBg(file)
  }

  return (
    <div className="font-outfit">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white">
        {/* decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-30 -translate-y-1/2"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 -translate-y-1/2"></div>

        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
            Powered by ClipDrop AI
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Remove Image Background<br />
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Upload any image and our AI will instantly remove the background with pixel-perfect precision.
            No design skills needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleUpload}
              className="hidden"
            />
            <button
              onClick={() => inputRef.current.click()}
              className="group flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Image — It's Free
            </button>
            <span className="text-slate-500 text-sm">✓ 5 free credits on signup</span>
          </div>

          {/* Demo visual */}
          <div className="mt-16 relative max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 p-6 border border-slate-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Before</p>
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🌆</div>
                      <p className="text-slate-400 text-sm">Original photo</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-violet-500 uppercase tracking-wider text-center">After ✨</p>
                  <div className="checkerboard rounded-2xl aspect-square flex items-center justify-center border-2 border-dashed border-violet-200">
                    <div className="text-center">
                      <div className="text-6xl mb-2">✨</div>
                      <p className="text-violet-400 text-sm">Background removed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-500 text-lg">Three simple steps to a transparent background</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative text-center p-8 rounded-3xl bg-gradient-to-b from-violet-50 to-white border border-violet-100 hover:shadow-lg hover:shadow-violet-100 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md shadow-violet-100 flex items-center justify-center text-3xl mx-auto mb-5">
                  {step.icon}
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Loved by Creators</h2>
            <p className="text-slate-500 text-lg">Join thousands of designers & entrepreneurs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(r.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{r.name}</p>
                    <p className="text-slate-400 text-xs">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-16 shadow-2xl shadow-violet-200">
          <h2 className="text-4xl font-bold text-white mb-4">Start Removing Backgrounds Today</h2>
          <p className="text-violet-200 mb-8 text-lg">Get 5 free credits instantly. No credit card needed.</p>
          <button
            onClick={() => inputRef.current.click()}
            className="bg-white text-violet-700 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-violet-50 transition-colors shadow-lg"
          >
            Try for Free →
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </section>
    </div>
  )
}

export default Home
