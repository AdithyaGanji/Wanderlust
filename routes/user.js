import express from 'express'
import User from '../models/user.js'
import passport from 'passport'
import { saveRedirectURL } from '../middleware.js'

const router = express.Router({ mergeParams: true })

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs')
})

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = new User({ username, email })

    const registeredUser = await User.register(newUser, password)
    console.log(registeredUser)

    req.login(registeredUser, (error) => {
      if (error) {
        return next(error)
      }

      req.flash("success", "Registered Succesfully. Welcome to Wanderlust!")
      res.redirect('/listings')
    })
  } catch (error) {
    req.flash("error", error.message + '.')
    res.redirect('/signup')
  }
})

router.get('/login', (req, res) => {
  res.render('users/login.ejs')
})

router.post(
  '/login',
  saveRedirectURL,
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  async (req, res) => {
    req.flash("success", "Login Successful!")
    res.redirect(res.locals.redirectURL || "/listings")
  }
)

router.get('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }

    req.flash("success", "Logout Successful!")
    res.redirect('/listings')
  })
})

export default router
