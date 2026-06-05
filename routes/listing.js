import express from 'express'
import { Listing } from "../models/listing.js"
import { wrapAsync } from "../utils/wrapAsync.js"
import { isLoggedIn, isOwner, validateListing } from '../middleware.js'

const router = express.Router({ mergeParams: true })

// ROUTES

// Index Route
router.get('/', wrapAsync(async (req, res) => {
  const listings = await Listing.find()
  res.render('listings/listings.ejs', { listings })
}))

// New Route
router.get('/new', isLoggedIn, (req, res) => {
  res.render('listings/new.ejs')
})

// Show Route
router.get('/:id', wrapAsync(async (req, res) => {
  const { id } = req.params
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      }
    })
    .populate("owner")

  if (!listing) {
    req.flash("error", "The listing you are trying to access does not exist.")
    return res.redirect('/listings')
  }

  res.render('listings/show.ejs', { listing })
}))

// Create Route
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing)
  newListing.owner = req.user

  await newListing.save()

  req.flash("success", "Listing Created Successfully!")
  res.redirect('/listings')
}))

// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params
  const listing = await Listing.findById(id)

  if (!listing) {
    req.flash("error", "The listing you are trying to edit does not exist.")
    return res.redirect('/listings')
  }

  res.render('listings/edit.ejs', { listing })
}))

// Update Route
router.patch(
  '/:id/edit',
  isLoggedIn,
  validateListing,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params
    const { listing } = req.body

    await Listing.findByIdAndUpdate(
      id,
      listing,
      { runValidators: true }
    )

    req.flash("success", "Listing Updated Successfully!")
    res.redirect(`/listings/${id}`)
  }
  ))

// Destroy Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params

  await Listing.findByIdAndDelete(id)

  req.flash("success", "Listing Deleted Successfully!")
  res.redirect('/listings')
}))

export default router
