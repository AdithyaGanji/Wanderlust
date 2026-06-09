import express from 'express'
import { wrapAsync } from "../utils/wrapAsync.js"
import { isLoggedIn, isOwner, validateListing } from '../middleware.js'
import listingController from '../controllers/listings.js'
import multer from 'multer'
import { cloudinary, storage } from '../cloud-config.js'

const router = express.Router({ mergeParams: true })
const upload = multer({ storage })

router.route('/')
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  )

router.get('/new', isLoggedIn, listingController.renderNewForm)

router.route('/:id')
  .get(wrapAsync(listingController.showListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))

router.route('/:id/edit')
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )

export default router
