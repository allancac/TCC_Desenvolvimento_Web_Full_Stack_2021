const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const createAuthRoutes = () => {
  const originAppServer = process.env.ORIGIN

  router.post(
    '/login/local',
    passport.authenticate('local', { failureRedirect: '/login/failed' }),
    (req, res) => {
      res.status(200).json({
        success: true,
        message: 'Login local realizado com sucesso',
        user: req.user,
      });
    }
  );

  router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        // cookies: req.cookies
      });
    }
  });

  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

  router.get('/logout', (req, res, next) => {
    req.logout((error) => {
      if (error) { return next(error) }
      res.send(200)
    })
  })

  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${originAppServer}/login` }),
    (req, res) => {
      res.redirect(`${originAppServer}`)
    }
  )

  router.get('/userinfo', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: 'Usuário não autenticado.' });
    }
  });


  return router
}

module.exports = createAuthRoutes