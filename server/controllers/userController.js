import userModel from '../models/userModel.js'
import transactionModel from '../models/transactionModel.js'
import Razorpay from 'razorpay'

export const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body
    let userData = await userModel.findOne({ clerkId })
    if (!userData) {
      userData = await userModel.create({
        clerkId,
        email: 'user@example.com',
        photo: 'https://www.gravatar.com/avatar',
        firstName: 'User',
        creditBalance: 5
      })
    }
    res.json({ success: true, credits: userData.creditBalance })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const paymentRazorpay = async (req, res) => {
  try {
    const { clerkId, planId } = req.body
    const userData = await userModel.findOne({ clerkId })
    if (!userData || !planId) {
      return res.json({ success: false, message: 'Invalid Credentials' })
    }
    let credits, plan, amount
    switch (planId) {
      case 'Basic': plan = 'Basic'; credits = 100; amount = 10; break
      case 'Advanced': plan = 'Advanced'; credits = 500; amount = 50; break
      case 'Business': plan = 'Business'; credits = 5000; amount = 250; break
      default: return res.json({ success: false, message: 'Plan not found' })
    }
    const newTransaction = await transactionModel.create({ clerkId, plan, amount, credits, date: Date.now() })
    const options = { amount: amount * 100, currency: process.env.CURRENCY.toUpperCase(), receipt: newTransaction._id.toString() }
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) return res.json({ success: false, message: error.message })
      res.json({ success: true, order })
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo.status === 'paid') {
      const transactionData = await transactionModel.findById(orderInfo.receipt)
      if (transactionData.payment) {
        return res.json({ success: false, message: 'Payment already processed' })
      }
      const userData = await userModel.findOne({ clerkId: transactionData.clerkId })
      await userModel.findByIdAndUpdate(userData._id, { creditBalance: userData.creditBalance + transactionData.credits })
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })
      res.json({ success: true, message: 'Credits added successfully' })
    } else {
      res.json({ success: false, message: 'Payment failed' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
