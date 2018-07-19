module.exports = (app) => {
    const orders = require('../controllers/order.controller.js');

    // Create a new Product
    app.post('/orders', orders.create);

    // Retrieve all Products
    app.get('/orders', orders.findAll);

    // Calculates the customer orders
    app.get('/orders/customer/:id', orders.calculateByCustomer);

    // Retrieve a single Product with id
    app.get('/orders/:id', orders.findOne);

    // Update a Product with id
    app.put('/orders/:id', orders.update);

    // Delete a Product with id
    app.delete('/orders/:id', orders.delete);
    
}