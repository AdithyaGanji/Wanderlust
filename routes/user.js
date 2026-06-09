import express from 'express'
import passport from 'passport'
import { saveRedirectURL } from '../middleware.js'
import userController from '../controllers/users.js'

const router = express.Router({ mergeParams: true })

router.route('/signup')
  .get(userController.renderSignupForm)
  .post(userController.signup)

router.route('/login')
  .get(userController.renderLoginForm)
  .post(
    saveRedirectURL,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    userController.login
  )

router.get('/logout', userController.logout)

export default router
