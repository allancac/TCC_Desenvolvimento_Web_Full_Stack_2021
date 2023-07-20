const router = require('express').Router();
const passport = require('passport')

const createAuthRoutes = () => {
  // @desc    Auth with Google
  // @route   GET /auth/google
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))

  // @desc    Google auth callback
  // @route   GET /auth/google/callback
  router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost/3000/login' }),
    (req, res) => {
      res.redirect('http://localhost:3000/vendas')
    }
  )

  // @desc    Logout user
  // @route   /auth/logout
  router.get('/logout', (req, res, next) => {
    req.logout((error) => {
      if (error) { return next(error) }
      res.redirect('http://localhost:3000/')
    })
  })
  return router
}

module.exports = createAuthRoutes