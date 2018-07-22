module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const auth = require('../controllers/auth.controller.js')

    // Retrieve all Users
    app.get('/user/me', auth.verifyToken, users.getUserSession);

    // Not implemented
    // // Create a new User
    // app.post('/users', auth.verifyToken, users.create);

    // // Retrieve all Users
    // app.get('/users', auth.verifyToken, users.findAll);

    // // Retrieve a single User with id
    // app.get('/users/:id', auth.verifyToken, users.findOne);

    // // Update a User with id
    // app.put('/users/:id', auth.verifyToken, users.update);

    // // Delete a User with id
    // app.delete('/users/:id', auth.verifyToken, users.delete);
    
}