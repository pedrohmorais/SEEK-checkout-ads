module.exports = (app) => {
    const privileges = require('../controllers/privilege.controller.js');

    // Create a new Product
    app.post('/privileges', privileges.create);

    // Retrieve all Products
    app.get('/privileges', privileges.findAll);

    // Retrieve a single Product with id
    app.get('/privileges/:id', privileges.findOne);

    // Update a Product with id
    app.put('/privileges/:id', privileges.update);

    // Delete a Product with id
    app.delete('/privileges/:id', privileges.delete);
    
}