const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/usuarioModel')

module.exports = function (passport, User) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL, //http://localhost:5500/auth/google/callback
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          id: profile.id,
          nomeUsuario: profile.displayName,
          nome: profile.name.givenName,
          sobrenome: profile.name.familyName,
          foto: profile.photos[0].value,
          email: profile.emails[0].value,
          perfil:'vendedor'
        }
        try {
          let [user, created] = await User.findOrCreate({ where: { id: profile.id }, defaults: newUser })
          if (user) {
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      if (user) {
        done(null, user)
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  })
}