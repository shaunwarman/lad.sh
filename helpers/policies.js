const Policies = require('@ladjs/policies');

const { appName } = require('../config');
const { Users } = require('../app/models');

const policies = new Policies({ appName }, api_token =>
  Users.findOne({ api_token })
);

policies.ensure2fa = (ctx, next) => {
  if (ctx.state.user && ctx.state.user.two_factor_enabled === true) {
    if (!ctx.session.secondFactor) {
      ctx.session.returnTo = ctx.originalUrl || ctx.req.url;
      if (!ctx.is('json'))
        ctx.flash(
          'warning',
          ctx.translate
            ? ctx.translate('TWO_FACTOR_REQUIRED')
            : 'Please log in with two factor authentication to view the page you requested.'
        );
      ctx.redirect('/login-otp');
      return;
    }
  }

  return next();
}

module.exports = policies;
