import { User } from "../models/user.js"

const renderSignupForm = (req, res) => {
  res.render('users/signup.ejs')
}

const signup = async (req, res) => {
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
}

const renderLoginForm = (req, res) => {
  res.render('users/login.ejs')
}

const login = async (req, res) => {
  req.flash("success", "Login Successful!")
  res.redirect(res.locals.redirectURL || "/listings")
}

const logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }

    req.flash("success", "Logout Successful!")
    res.redirect('/listings')
  })
}

const userController = {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  logout
}

export default userController
