import express from 'express'
import { wrapAsync } from "../utils/wrapAsync.js"
import { validateReview, isLoggedIn } from '../middleware.js'
import reviewController from '../controllers/reviews.js'

const router = express.Router({ mergeParams: true })

// ROUTES

// Create Route
router.post(
  '/',
  validateReview,
  isLoggedIn, wrapAsync(reviewController.createReview)
)

// Destroy Route
router.delete(
  '/:reviewId',
  isLoggedIn,
  wrapAsync(reviewController.deleteReview)
)

export default router
