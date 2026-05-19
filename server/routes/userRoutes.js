import express from 'express'
import { userCredits, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
import { clerkWebhooks, clerkMiddleware } from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebhooks)
userRouter.post('/credits', clerkMiddleware, userCredits)
userRouter.post('/pay-razor', clerkMiddleware, paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay)

export default userRouter
