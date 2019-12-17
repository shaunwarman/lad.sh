const Router = require('@koa/router');
const render = require('koa-views-render');

const policies = require('../../helpers/policies');
const web = require('../../app/controllers/web');

const router = new Router({ prefix: '/my-account' });

router.use(policies.ensureLoggedIn);
router.use(policies.ensure2fa);
router.use(web.breadcrumbs);
router.get('/', render('my-account'));
router.put('/', web.myAccount.update);
router.delete('/security', web.myAccount.resetAPIToken);
router.get('/security', web.myAccount.security);
router.post('/security', web.myAccount.setup2fa);

module.exports = router;
