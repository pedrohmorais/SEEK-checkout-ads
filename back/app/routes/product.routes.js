module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create a new Product
    app.post('/products', products.create);

    // Retrieve all Products
    app.get('/products', products.findAll);

    // Retrieve a single Product with id
    app.get('/products/:id', products.findOne);

    // Update a Product with id
    app.put('/products/:id', products.update);

    // Delete a Product with id
    app.delete('/products/:id', products.delete);
    
}