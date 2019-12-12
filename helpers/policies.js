const Policies = require('@ladjs/policies');

const { appName } = require('../config');
const { Users } = require('../app/models');

const policies = new Policies({ appName }, api_token =>
  Users.findOne({ api_token })
);

policies.ensureSecondFactor = (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.session.returnTo = ctx.originalUrl || ctx.req.url;
    if (!ctx.is('json'))
      ctx.flash(
        'warning',
        ctx.translate
          ? ctx.translate('LOGIN_REQUIRED')
          : 'Please log in to view the page you requested.'
      );
    ctx.redirect('/login');
    return;
  }

  return next();
}

module.exports = policies;
