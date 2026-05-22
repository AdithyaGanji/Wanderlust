import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/vector-1746092444052-661ae4de13a4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) => 
      v === ""
        ? "https://images.unsplash.com/vector-1746092444052-661ae4de13a4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v
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
})

export const Listing = mongoose.model("listing", listingSchema)
