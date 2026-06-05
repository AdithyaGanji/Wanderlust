import express from 'express'
import passport from 'passport'
import { saveRedirectURL } from '../middleware.js'
import userController from '../controllers/users.js'

const router = express.Router({ mergeParams: true })

router.get('/signup', userController.renderSignupForm)

router.post('/signup', userController.signup)

router.get('/login', userController.renderLoginForm)

router.post(
  '/login',
  saveRedirectURL,
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  userController.login
)

router.get('/logout', userController.logout)

export default router
