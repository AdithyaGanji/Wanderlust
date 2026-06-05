import { Listing } from "./models/listing.js"
import { listingSchema, reviewSchema } from './schema.js'
import { ExpressError } from './utils/ExpressError.js'

export const validateListing = (req, res, next) => {
  const {error} = listingSchema.validate(req.body)
  if (error)
    throw new ExpressError(500, error)
  else
    next()
}

export const validateReview = (req, res, next) => {
  const {error} = reviewSchema.validate(req.body)
  if (error)
    throw new ExpressError(500, error)
  else
    next()
}

export function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectURL = req.originalUrl

    req.flash("error", "You must be logged in to perform the requested action.")
    return res.redirect("/login")
  }
  
  next()
}

export function saveRedirectURL(req, res, next) {
  if (req.session.redirectURL)
    res.locals.redirectURL = req.session.redirectURL

  next()
}

export async function isOwner(req, res, next) {
  const { id } = req.params
  
  const listing = await Listing.findById(id)
  if (res.locals.currentUser && !listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have authorization to edit or delete the requested listing.")
    return res.redirect(`/listings/${id}`)
  }

  next()
}
