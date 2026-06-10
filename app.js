import express from 'express'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import ejsMate from 'ejs-mate'
import listingsRouter from './routes/listing.js'
import reviewsRouter from './routes/review.js'
import usersRouter from './routes/user.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'connect-flash'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { User } from './models/user.js'
import { configDotenv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

if (process.env.NODE_ENV !== 'production')
  configDotenv()

const port = 8080
const app = express()
const dbURL = process.env.ATLASDB_URL
// const dbURL = 'mongodb://127.0.0.1:27017/wanderlust'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 60 * 60
})

store.on("error", () => {
  console.log("Error in Mongo Session Store.")
})

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
  store
}

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", 'ejs')
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session(sessionOptions))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

(async function () {
  try {
    const res = await mongoose.connect(dbURL)
    console.log("DB connection successful!")
  } catch (err) {
    console.log(err)
  }
})()

app.use((req, res, next) => {
  res.locals.currentUser = req.user

  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  
  next()
})

app.get('/', (req, res) => { res.redirect('/listings') })

app.use('/listings', listingsRouter)
app.use('/listings/:id/reviews', reviewsRouter)
app.use('/', usersRouter)

app.use((req, res) => {
  res.status(404).render('not-found.ejs')
})

app.use((err, req, res, next) => {
  const { statusCode=500, message="Something went wrong." } = err
  console.log(err)
  res.status(statusCode).render('error.ejs', { message })
})
  
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

export default app
