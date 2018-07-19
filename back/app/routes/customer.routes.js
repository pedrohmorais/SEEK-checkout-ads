module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');

    // Create a new Product
    app.post('/customers', customers.create);

    // Retrieve all Products
    app.get('/customers', customers.findAll);

    // Retrieve a single Product with id
    app.get('/customers/:id', customers.findOne);

    // Update a Product with id
    app.put('/customers/:id', customers.update);

    // Delete a Product with id
    app.delete('/customers/:id', customers.delete);
    
}