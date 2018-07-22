module.exports = (app) => {
    const orders = require('../controllers/order.controller.js');
    const auth = require('../controllers/auth.controller.js')

    // Create a new Product
    app.post('/orders', auth.verifyToken, orders.create);

    // Retrieve all Products
    app.get('/orders', auth.verifyToken, orders.findAll);

    // Calculates the customer orders
    app.get('/orders/customer/:id', auth.verifyToken, orders.calculateByCustomer);

    // Retrieve a single Product with id
    app.get('/orders/:id', auth.verifyToken, orders.findOne);

    // Update a Product with id
    app.put('/orders/:id', auth.verifyToken, orders.update);

    // Delete a Product with id
    app.delete('/orders/:id', auth.verifyToken, orders.delete);
    
}