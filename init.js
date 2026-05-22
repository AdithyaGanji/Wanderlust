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
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage. Enjoy stunning ocean views, hear the waves crash, and walk directly onto the sandy shore. Perfect for a peaceful weekend getaway.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Downtown Loft",
    description:
      "Experience city living at its finest in this sleek, industrial-style loft located in the heart of downtown. Features high ceilings, modern amenities, and easy access to local cafes and shops.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Rustic Mountain Cabin",
    description:
      "Unplug and recharge in this cozy wooden cabin nestled high in the mountains. Surrounded by towering pines and scenic hiking trails, it's the ultimate retreat for nature lovers.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 950,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Step back in time at this beautifully restored 18th-century villa. Relax by the private pool, wander through local olive groves, and enjoy authentic Italian countryside views.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Oasis",
    description:
      "Live out your childhood dreams in this luxury treehouse suspended in the forest canopy. Features a private hot tub, wrap-around deck, and stargazing skylights.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Luxury Beachfront Resort",
    description:
      "Indulge in a 5-star experience with private beach access, infinity pools, and world-class dining right at your doorstep. Perfect for honeymoons or luxury vacations.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 3200,
    location: "Maldives",
    country: "Maldives",
  }
];

Listing.insertMany(sampleListings)
  .then((res) => { console.log(res) })
  .catch((err) => { console.log(err) })
