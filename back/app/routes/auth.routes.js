module.exports = (app) => {
    const authenticate = require('../controllers/auth.controller.js');
    const auth = require('../controllers/auth.controller.js')

    // Authenticate login
    app.post('/auth', authenticate.login);
}