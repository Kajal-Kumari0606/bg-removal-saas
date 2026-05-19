import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/clerk-react'

const plans = [
  {
    id: 'Basic',
    name: 'Basic',
    desc: 'Great for trying out',
    price: 10,
    credits: 100,
    popular: false,
    color: 'from-slate-600 to-slate-800',
    features: ['100 image removals', 'Standard quality', 'PNG download', '30-day validity']
  },
  {
    id: 'Advanced',
    name: 'Advanced',
    desc: 'For professionals',
    price: 50,
    credits: 500,
    popular: true,
    color: 'from-violet-600 to-blue-600',
    features: ['500 image removals', 'High quality output', 'PNG download', '90-day validity', 'Priority processing']
  },
  {
    id: 'Business',
    name: 'Business',
    desc: 'For teams & agencies',
    price: 250,
    credits: 5000,
    popular: false,
    color: 'from-blue-700 to-indigo-800',
    features: ['5000 image removals', 'Highest quality', 'PNG download', '1-year validity', 'Priority processing', 'Bulk processing']
  }
]

const BuyCredit = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext)
  const { user } = useUser()
  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'BgRemover AI Credits',
      description: 'Purchase Credits',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response)
          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success('Credits added successfully! 🎉')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handleBuy = async (planId) => {
    try {
      if (!user) {
        return toast.error('Please sign in to purchase credits')
      }

      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', {
        clerkId: user.id,
        planId
      })

      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-[80vh] px-6 py-20">
      {/* Load Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Buy credits once, use them anytime. No subscriptions, no hidden fees.
            Each credit = 1 background removal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular
                  ? 'shadow-2xl shadow-violet-200 ring-2 ring-violet-400'
                  : 'shadow-lg border border-slate-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-blue-500 text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
                  ⭐ Most Popular
                </div>
              )}

              <div className={`bg-gradient-to-br ${plan.color} p-8 text-white ${plan.popular ? 'pt-12' : ''}`}>
                <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
                <p className="text-white/70 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold">${plan.price}</span>
                  <span className="text-white/70 mb-1.5">one-time</span>
                </div>
                <p className="text-white/80 text-sm mt-2">{plan.credits.toLocaleString()} credits</p>
              </div>

              <div className="bg-white p-8">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBuy(plan.id)}
                  className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:opacity-90 shadow-lg shadow-violet-200'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  Buy {plan.name} Plan →
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-sm mt-10">
          💳 Secure payment via Razorpay • 🔒 SSL Encrypted • ✓ Instant delivery
        </p>
      </div>
    </div>
  )
}

export default BuyCredit
