const config = require("config")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usuarioModel')
const bcrypt = require('bcrypt');

module.exports = function (passport, User) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get('google.clientid'),
        clientSecret: config.get('google.clientSecret'),
        callbackURL: config.get('google.callbackUrl'), //https://tccpucminas.azurewebsites.net/auth/google/callback
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          id: profile.id,
          nomeUsuario: profile.displayName,
          nome: profile.name.givenName,
          sobrenome: profile.name.familyName,
          foto: profile.photos[0].value,
          email: profile.emails[0].value,
          perfil: 'vendedor'
        }
        try {
          let [user, created] = await User.findOrCreate({ where: { id: profile.id }, defaults: newUser })
          if (user) {
            done(null, user)
          }
        } catch (err) {
          console.error(err)
          done(err)
        }
      }
    )
  )

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (email, senha, done) => {
        try {
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return done(null, false, { message: 'E-mail ou senhas inválidos' });
          }

          const isPasswordValid = await bcrypt.compare(senha, user.senha);

          if (!isPasswordValid) {
            return done(null, false, { message: 'E-mail ou senhas inválidos' });
          }

          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

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