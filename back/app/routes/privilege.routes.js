module.exports = (app) => {
    const privileges = require('../controllers/privilege.controller.js');
    const auth = require('../controllers/auth.controller.js')

    // Create a new Product
    app.post('/privileges', auth.verifyToken, privileges.create);

    // Retrieve all Products
    app.get('/privileges', auth.verifyToken, privileges.findAll);

    // Retrieve a single Product with id
    app.get('/privileges/:id', auth.verifyToken, privileges.findOne);

    // Update a Product with id
    app.put('/privileges/:id', auth.verifyToken, privileges.update);

    // Delete a Product with id
    app.delete('/privileges/:id', auth.verifyToken, privileges.delete);
    
}