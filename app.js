import express from 'express'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import ejsMate from 'ejs-mate'
import { Listing } from './models/listing.js';

const port = 8080
const app = express()

app.set("view engine", 'ejs')
app.engine('ejs', ejsMate)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

(async function () {
  try {
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    console.log("DB connection successful!")
  } catch (err) {
    console.log(err)
  }
})()

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
  console.log("Hello, World!")
})

app.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find()
    res.render('listings/listings.ejs', { listings })
  } catch (error) {
    console.log(error)
  }
})

app.get('/listings/new', (req, res) => {
  res.render('listings/new.ejs')
})

app.get('/listings/:id', async (req, res) => {
  const { id } = req.params

  try {
    const listing = await Listing.findById(id)
    res.render('listings/show.ejs', { listing })
  } catch (error) {
    console.log(error)
  }
})

app.post('/listings', async (req, res) => {
  const newListing = new Listing(req.body.listing)

  try {
    await newListing.save()
    res.redirect('/listings')
  } catch (error) {
    console.log(error)
  }
})

app.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params

  try {
    const listing = await Listing.findById(id)
    res.render('listings/edit.ejs', { listing })
  } catch (error) {
    console.log(error)
  }
})

app.patch('/listings/:id/edit', async (req, res) => {
  const { id } = req.params
  const { listing } = req.body

  try {
    await Listing.findByIdAndUpdate(
      id,
      listing,
      { runValidators: true }
    )

    res.redirect(`/listings/${id}`)
  } catch (error) {
    console.log(error)
  }
})

app.delete('/listings/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Listing.findByIdAndDelete(id)
    res.redirect('/listings')
  } catch (error) {
    console.log(error)
  }
})
