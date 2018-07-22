module.exports = (app) => {
    const products = require('../controllers/product.controller.js');
    const auth = require('../controllers/auth.controller.js')

    // Create a new Product
    app.post('/products', auth.verifyToken, products.create);

    // Retrieve all Products
    app.get('/products', auth.verifyToken, products.findAll);

    // Retrieve a single Product with id
    app.get('/products/:id', auth.verifyToken, products.findOne);

    // Update a Product with id
    app.put('/products/:id', auth.verifyToken, products.update);

    // Delete a Product with id
    app.delete('/products/:id', auth.verifyToken, products.delete);
    
}