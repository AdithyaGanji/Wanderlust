import mongoose from 'mongoose'
import { Review } from './review.js'

const Schema = mongoose.Schema

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    fileName: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["hotels", "cities", "mountains", "castles", "pools", "farms", "arctic", "beaches"]
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}})
  }
})

export const Listing = mongoose.model("listing", listingSchema)
