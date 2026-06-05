import express from 'express'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import ejsMate from 'ejs-mate'
import listingsRouter from './routes/listing.js'
import reviewsRouter from './routes/review.js'
import usersRouter from './routes/user.js'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { User } from './models/user.js'

const port = 8080
const app = express()
const sessionOptions = {
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.set("view engine", 'ejs')
app.engine('ejs', ejsMate)
app.use(express.static('public'))
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
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    console.log("DB connection successful!")
  } catch (err) {
    console.log(err)
  }
})()

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.use((req, res, next) => {
  res.locals.currentUser = req.user

  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  
  next()
})

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
