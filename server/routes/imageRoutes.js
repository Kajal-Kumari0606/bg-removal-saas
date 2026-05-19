import express from 'express'
import { removeBgImage } from '../controllers/imageController.js'
import upload from '../configs/multer.js'
import { clerkMiddleware } from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/remove-bg', upload.single('image'), clerkMiddleware, removeBgImage)

export default imageRouter
