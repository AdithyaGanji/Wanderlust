import mongoose from 'mongoose'
import { Listing } from './models/listing.js'

(async function () {
  try {
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    console.log("DB connection successful!")
  } catch (err) {
    console.log(err)
  }
})()

const sampleListings = [
  {
    title: "Modern Beachfront Villa",
    description: "Step out of your door onto the sandy beach. This modern villa offers panoramic ocean views, a private infinity pool, and luxurious contemporary furnishings.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Malibu",
    country: "United States"
  },
  {
    title: "Tranquil Mountain Retreat",
    description: "Nestled high in the mountains, this peaceful retreat offers breathtaking valley views, cozy fireplaces, and direct access to pristine hiking trails.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Banff",
    country: "Canada"
  },
  {
    title: "Urban Architecture Loft",
    description: "A stunning architectural marvel in the city center. This loft features exposed brick, massive glass windows, and walking distance to the best restaurants.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 850,
    location: "Berlin",
    country: "Germany"
  },
  {
    title: "Charming Evening Cottage",
    description: "Experience the magic of the countryside in this warmly lit cottage. Features an outdoor fire pit, antique decor, and a beautiful wraparound porch.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 450,
    location: "Cotswolds",
    country: "United Kingdom"
  },
  {
    title: "Classic American Farmhouse",
    description: "A massive, beautifully restored farmhouse sitting on 50 acres of private land. Perfect for large family gatherings and peaceful countryside walks.",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Nashville",
    country: "United States"
  },
  {
    title: "Ultra-Luxury Mansion",
    description: "Live like royalty in this incredible estate. Boasting a massive private pool, home theater, wine cellar, and a full staff at your service.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 5500,
    location: "Beverly Hills",
    country: "United States"
  },
  {
    title: "Industrial Chic Studio",
    description: "A spacious, open-concept studio apartment featuring high industrial ceilings, modern art pieces, and a vibrant neighborhood right downstairs.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 600,
    location: "Brooklyn",
    country: "United States"
  },
  {
    title: "Minimalist Zen Apartment",
    description: "Find your inner peace in this bright, plant-filled minimalist apartment. Stripped of clutter, it offers a calming environment in a bustling city.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 400,
    location: "Tokyo",
    country: "Japan"
  },
  {
    title: "Rustic Woodland Cabin",
    description: "A genuine log cabin hidden deep in the woods. Disconnect from technology and enjoy nature, wildlife, and a wood-burning stove.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 350,
    location: "Smoky Mountains",
    country: "United States"
  },
  {
    title: "Serene Lakeside Getaway",
    description: "Wake up to the sound of water lapping against the private dock. Includes complimentary kayaks, a lakeside fire pit, and stunning sunset views.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 750,
    location: "Lake Tahoe",
    country: "United States"
  },
  {
    title: "Epic Wilderness Lodge",
    description: "Surrounded by towering peaks and dramatic landscapes, this isolated lodge is an adventurer's dream come true.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Patagonia",
    country: "Chile"
  },
  {
    title: "Alpine A-Frame Cabin",
    description: "A perfectly designed A-frame cabin perched on a hillside. Features a cozy sleeping loft, incredible valley views, and modern amenities.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 500,
    location: "Dolomites",
    country: "Italy"
  },
  {
    title: "Forest Canopy Treehouse",
    description: "Sleep among the birds in this incredible suspended treehouse. Built entirely of reclaimed wood with a suspension bridge entrance.",
    image: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 650,
    location: "Blue Mountains",
    country: "Australia"
  },
  {
    title: "Mediterranean Coastal Villa",
    description: "A stunning white-washed villa overlooking the azure sea. Features a private terrace, traditional tilework, and absolute privacy.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Santorini",
    country: "Greece"
  },
  {
    title: "Contemporary Desert Estate",
    description: "A masterpiece of modern design seamlessly integrated into the desert landscape. Includes a vanishing edge pool and dramatic night lighting.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1900,
    location: "Scottsdale",
    country: "United States"
  },
  {
    title: "Classic Suburban Home",
    description: "A beautiful, welcoming home in a quiet neighborhood. Features a large backyard, modern kitchen, and plenty of space for family vacations.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 450,
    location: "Austin",
    country: "United States"
  }
].map((listing) => ({...listing, owner: '6a215b1b0d3c7615ee428994'}))

Listing.insertMany(sampleListings)
  .then((res) => { console.log(res) })
  .catch((err) => { console.log(err) })
