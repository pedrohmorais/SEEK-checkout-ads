module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');
    const auth = require('../controllers/auth.controller.js')

    // Create a new Product
    app.post('/customers', auth.verifyToken, customers.create);

    // Retrieve all Products
    app.get('/customers', auth.verifyToken, customers.findAll);

    // Retrieve a single Product with id
    app.get('/customers/:id', auth.verifyToken, customers.findOne);

    // Update a Product with id
    app.put('/customers/:id', auth.verifyToken, customers.update);

    // Delete a Product with id
    app.delete('/customers/:id', auth.verifyToken, customers.delete);
    
}