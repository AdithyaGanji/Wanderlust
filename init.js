import mongoose from 'mongoose'
import { Listing } from './models/listing.js'
import { User } from './models/user.js';
import { Review } from './models/review.js';
import { configDotenv } from 'dotenv'

if (process.env.NODE_ENV !== 'production')
  configDotenv()

const dbURL = process.env.ATLASDB_URL;
// const dbURL = 'mongodb://127.0.0.1:27017/wanderlust';

(async function () {
  try {
    const res = await mongoose.connect(dbURL)
    console.log("DB connection successful!")
  } catch (err) {
    console.log(err)
  }
})()

async function resetListings() {
  try {
    await Listing.deleteMany({})
    console.log("Existing listings cleared succesfully!")

    const testUser = await User.findOne({username: 'test'})
    const sampleListings = [
      {
        title: "Modern Beachfront Villa",
        description: "Step out of your door onto the sandy beach. This modern villa offers panoramic ocean views, a private infinity pool, and luxurious contemporary furnishings.",
        image: {
          url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "modern-beachfront-villa"
        },
        price: 2500,
        location: "Malibu",
        country: "United States",
        category: "beaches"
      },
      {
        title: "Tranquil Mountain Retreat",
        description: "Nestled high in the mountains, this peaceful retreat offers breathtaking valley views, cozy fireplaces, and direct access to pristine hiking trails.",
        image: {
          url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "tranquil-mountain-retreat"
        },
        price: 1100,
        location: "Banff",
        country: "Canada",
        category: "mountains"
      },
      {
        title: "Urban Architecture Loft",
        description: "A stunning architectural marvel in the city center. This loft features exposed brick, massive glass windows, and walking distance to the best restaurants.",
        image: {
          url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "urban-architecture-loft"
        },
        price: 850,
        location: "Berlin",
        country: "Germany",
        category: "cities"
      },
      {
        title: "Charming Evening Cottage",
        description: "Experience the magic of the countryside in this warmly lit cottage. Features an outdoor fire pit, antique decor, and a beautiful wraparound porch.",
        image: {
          url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "charming-evening-cottage"
        },
        price: 450,
        location: "Cotswolds",
        country: "United Kingdom",
        category: "farms"
      },
      {
        title: "Classic American Farmhouse",
        description: "A massive, beautifully restored farmhouse sitting on 50 acres of private land. Perfect for large family gatherings and peaceful countryside walks.",
        image: {
          url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "classic-american-farmhouse"
        },
        price: 900,
        location: "Nashville",
        country: "United States",
        category: "farms"
      },
      {
        title: "Ultra-Luxury Mansion",
        description: "Live like royalty in this incredible estate. Boasting a massive private pool, home theater, wine cellar, and a full staff at your service.",
        image: {
          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "ultra-luxury-mansion"
        },
        price: 5500,
        location: "Beverly Hills",
        country: "United States",
        category: "castles"
      },
      {
        title: "Industrial Chic Studio",
        description: "A spacious, open-concept studio apartment featuring high industrial ceilings, modern art pieces, and a vibrant neighborhood right downstairs.",
        image: {
          url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "industrial-chic-studio"
        },
        price: 600,
        location: "Brooklyn",
        country: "United States",
        category: "cities"
      },
      {
        title: "Minimalist Zen Apartment",
        description: "Find your inner peace in this bright, plant-filled minimalist apartment. Stripped of clutter, it offers a calming environment in a bustling city.",
        image: {
          url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "minimalist-zen-apartment"
        },
        price: 400,
        location: "Tokyo",
        country: "Japan",
        category: "cities"
      },
      {
        title: "Rustic Woodland Cabin",
        description: "A genuine log cabin hidden deep in the woods. Disconnect from technology and enjoy nature, wildlife, and a wood-burning stove.",
        image: {
          url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "rustic-woodland-cabin"
        },
        price: 350,
        location: "Smoky Mountains",
        country: "United States",
        category: "mountains"
      },
      {
        title: "Serene Lakeside Getaway",
        description: "Wake up to the sound of water lapping against the private dock. Includes complimentary kayaks, a lakeside fire pit, and stunning sunset views.",
        image: {
          url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "serene-lakeside-getaway"
        },
        price: 750,
        location: "Lake Tahoe",
        country: "United States",
        category: "pools"
      },
      {
        title: "Epic Wilderness Lodge",
        description: "Surrounded by towering peaks and dramatic landscapes, this isolated lodge is an adventurer's dream come true.",
        image: {
          url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "epic-wilderness-lodge"
        },
        price: 1200,
        location: "Patagonia",
        country: "Chile",
        category: "arctic"
      },
      {
        title: "Alpine A-Frame Cabin",
        description: "A perfectly designed A-frame cabin perched on a hillside. Features a cozy sleeping loft, incredible valley views, and modern amenities.",
        image: {
          url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "alpine-a-frame-cabin"
        },
        price: 500,
        location: "Dolomites",
        country: "Italy",
        category: "mountains"
      },
      {
        title: "Forest Canopy Treehouse",
        description: "Sleep among the birds in this incredible suspended treehouse. Built entirely of reclaimed wood with a suspension bridge entrance.",
        image: {
          url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "forest-canopy-treehouse"
        },
        price: 650,
        location: "Blue Mountains",
        country: "Australia",
        category: "farms"
      },
      {
        title: "Mediterranean Coastal Villa",
        description: "A stunning white-washed villa overlooking the azure sea. Features a private terrace, traditional tilework, and absolute privacy.",
        image: {
          url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "mediterranean-coastal-villa"
        },
        price: 2200,
        location: "Santorini",
        country: "Greece",
        category: "beaches"
      },
      {
        title: "Contemporary Desert Estate",
        description: "A masterpiece of modern design seamlessly integrated into the desert landscape. Includes a vanishing edge pool and dramatic night lighting.",
        image: {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "contemporary-desert-estate"
        },
        price: 1900,
        location: "Scottsdale",
        country: "United States",
        category: "hotels"
      },
      {
        title: "Classic Suburban Home",
        description: "A beautiful, welcoming home in a quiet neighborhood. Features a large backyard, modern kitchen, and plenty of space for family vacations.",
        image: {
          url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
          fileName: "classic-suburban-home"
        },
        price: 450,
        location: "Austin",
        country: "United States",
        category: "cities"
      }
    ].map((listing) => ({...listing, owner: testUser._id}))

    Listing.insertMany(sampleListings)
      .then((res) => { 
        console.log(res)
      })
      .catch((err) => {
        console.log(err) 
      })
  } catch (error) {
    console.log(error)
  }
}

async function clearReviews() {
  try {
    await Review.deleteMany({})
    console.log("Existing reviews cleared succesfully!")
  } catch (error) {
    console.log(error)
  }
}

async function clearUsers() {
  try {
    await User.deleteMany({})
    console.log("Existing users cleared succesfully!")
  } catch (error) {
    console.log(error)
  }
}

// resetListings()
// clearReviews()
// clearUsers()
