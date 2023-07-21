const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');

const createAuthRoutes = () => {
  // @desc    Auth with Google
  // @route   GET /auth/google
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))

  // @desc    Google auth callback
  // @route   GET /auth/google/callback
  router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost/3000/login' }),
    (req, res) => {
      const token = jwt.sign({ userId: req.user.id }, 'sua-chave-secreta', { expiresIn: '1h' });

      // Adicionar o token no cabeçalho de resposta
      res.setHeader('Authorization', `Bearer ${token}`);
      res.redirect('http://localhost:3000/')
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