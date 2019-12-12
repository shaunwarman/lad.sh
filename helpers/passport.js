const Passport = require('@ladjs/passport');

const OtpStrategy = require('passport-otp-strategy').Strategy;

const config = require('../config');
const { Users } = require('../app/models');

const passport = new Passport(Users, config.passport);

if (true || process.env.AUTH_2FA_ENABLED) {
  passport.use(new OtpStrategy(
  {
    codeField: 'code',
    authenticator: {}
  },
  function(user, done) {
    return done(null, 123);
    // TotpKey.findOne({ userId: user.id }, function (err, key) {
    //   if (err) { return done(err); }
    //   return done(null, key.key);
    // });
  }));
}

module.exports = passport;
