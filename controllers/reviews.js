import { Listing } from "../models/listing.js"
import { Review } from "../models/review.js"

const createReview = async (req, res) => {
  const { id } = req.params
  const { review } = req.body

  const newReview = new Review(review)
  newReview.author = req.user

  const listing = await Listing.findById(id)
  listing.reviews.push(newReview);

  await newReview.save()
  await listing.save()

  req.flash("success", "Review Added Successfully!")
  res.redirect(`/listings/${id}`)
}

const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params
  const review = await Review.findById(reviewId).populate("author")

  if (res.locals.currentUser && !review.author._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have authorization to delete the review.")
    return res.redirect(`/listings/${id}`)
  }
  
  await Review.findByIdAndDelete(reviewId)
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })

  req.flash("success", "Review Deleted Successfully!")
  res.redirect(`/listings/${id}`)
}

const reviewController = {
  createReview,
  deleteReview
}

export default reviewController
