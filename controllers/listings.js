import { Listing } from "../models/listing.js"

const index = async (req, res) => {
  let { location, category } = req.query
  let query = {}

  if (location && location.length) {
    location = location.trim()
    query = {
      $or: [
        { location: {$regex: location, $options: 'i' } },
        { country: {$regex: location, $options: 'i' } },
      ]
    }
  }
  else if (category && category != 'trending') { 
    query = { category }
  }

  const listings = await Listing.find(query)

  const props = { listings }
  props.category = (location) ? '' : category

  res.render('listings/listings.ejs', props)
}

const renderNewForm = (req, res) => {
  res.render('listings/new.ejs')
}

const showListing = async (req, res) => {
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
}

const createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing)
  newListing.owner = req.user
  
  if (req.file) {
    newListing.image.fileName = req.file.filename
    newListing.image.url = req.file.path
  }

  await newListing.save()

  req.flash("success", "Listing Created Successfully!")
  res.redirect('/listings')
}

const renderEditForm = async (req, res) => {
  const { id } = req.params
  const listing = await Listing.findById(id)

  if (!listing) {
    req.flash("error", "The listing you are trying to edit does not exist.")
    return res.redirect('/listings')
  }

  const originalListingURL = listing.image.url
  res.render('listings/edit.ejs', { listing, originalListingURL })
}

const updateListing = async (req, res) => {
  const { id } = req.params
  const { listing } = req.body

  if (req.file) {
    listing.image = { url: req.file.path, filename: req.file.filename  }
  }

  await Listing.findByIdAndUpdate(
    id,
    listing,
    { runValidators: true }
  )

  req.flash("success", "Listing Updated Successfully!")
  res.redirect(`/listings/${id}`)
}

const deleteListing = async (req, res) => {
  const { id } = req.params

  await Listing.findByIdAndDelete(id)

  req.flash("success", "Listing Deleted Successfully!")
  res.redirect('/listings')
}

const listingController = {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing
}

export default listingController
