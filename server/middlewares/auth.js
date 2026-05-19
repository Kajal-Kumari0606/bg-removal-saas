import { Webhook } from 'svix'
// svix is used for verifying Clerk webhooks
import userModel from '../models/userModel.js'

// Middleware: Verify Clerk JWT and attach userId to req
export const clerkMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized' })
    }

    // Decode JWT to get clerkId
    const decoded = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    )
    const clerkId = decoded.sub

    if (!clerkId) {
      return res.json({ success: false, message: 'Not Authorized' })
    }

    req.body.clerkId = clerkId
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Webhook handler to sync Clerk users to MongoDB
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    await whook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature']
    })

    const { data, type } = req.body

    switch (type) {
      case 'user.created': {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url
        }
        await userModel.create(userData)
        res.json({})
        break
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url
        }
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
        res.json({})
        break
      }

      case 'user.deleted': {
        await userModel.findOneAndDelete({ clerkId: data.id })
        res.json({})
        break
      }

      default:
        res.json({})
        break
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
