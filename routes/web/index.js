const Router = require('@koa/router');
const render = require('koa-views-render');

const { web } = require('../../app/controllers');
const { policies } = require('../../helpers');
const admin = require('./admin');
const auth = require('./auth');
const myAccount = require('./my-account');

const router = new Router();

const localeRouter = new Router({ prefix: '/:locale' });

localeRouter
  .get('/', web.auth.homeOrDashboard)
  .get(
    '/dashboard',
    policies.ensureLoggedIn,
    // TODO: policies.ensure2FA
    web.breadcrumbs,
    render('dashboard')
  )
  .get('/about', render('about'))
  .get('/404', render('404'))
  .get('/500', render('500'))
  .get('/terms', render('terms'))
  .get('/privacy', render('privacy'))
  .get('/support', render('support'))
  .post('/support', web.support)
  .get('/forgot-password', render('forgot-password'))
  .post('/forgot-password', web.auth.forgotPassword)
  .get('/reset-password/:token', render('reset-password'))
  .post('/reset-password/:token', web.auth.resetPassword)
  .get('/logout', policies.ensureLoggedIn, web.auth.logout)
  .get('/login', policies.ensureLoggedOut, web.auth.registerOrLogin)
  .post('/login', policies.ensureLoggedOut, web.auth.login)
  .get('/login-otp', policies.ensureLoggedIn, web.auth.renderOtp)
  .post('/login-otp', policies.ensureLoggedIn, web.auth.loginOtp)
  .get('/register', policies.ensureLoggedOut, web.auth.registerOrLogin)
  .post('/register', policies.ensureLoggedOut, web.auth.register);

localeRouter.use(myAccount.routes());
localeRouter.use(admin.routes());

router.use(auth.routes());
router.use(localeRouter.routes());

module.exports = router;
