import mongoose from 'mongoose'
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

export const Review = mongoose.model("Review", reviewSchema)
