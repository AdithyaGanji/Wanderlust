import express from 'express'
import { wrapAsync } from "../utils/wrapAsync.js"
import { isLoggedIn, isOwner, validateListing } from '../middleware.js'
import listingController from '../controllers/listings.js'

const router = express.Router({ mergeParams: true })

// ROUTES

// Index Route
router.get('/', wrapAsync(listingController.index))

// New Route
router.get('/new', isLoggedIn, listingController.renderNewForm)

// Show Route
router.get('/:id', wrapAsync(listingController.showListing))

// Create Route
router.post('/',
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
)

// Edit Route
router.get('/:id/edit',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
)

// Update Route
router.patch(
  '/:id/edit',
  isLoggedIn,
  validateListing,
  isOwner,
  wrapAsync(listingController.updateListing)
)

// Destroy Route
router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
)

export default router
