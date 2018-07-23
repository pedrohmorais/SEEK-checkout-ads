const Product = require('../models/product.model.js');
const payload = require('../../config/payload.config.js');

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.productId) {
        return res.status(400).send({
            message: "Product Id field can not be empty"
        });
    }

    if(!req.body.price || Number.isNaN(req.body.price) || req.body.price < 0) {
        return res.status(400).send({
            message: "Product price must be a number greater than or equal to zero"
        });
    }

    // Create a Product
    const product = new Product({
        productId: req.body.productId,
        name: req.body.name || "Unnamed Product", 
        price: req.body.price
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(payload.success(products));
    }).catch(err => {
        res.status(500).send(payload.error(err.message || "Some error occurred while retrieving products."));
    });
};

// Find a single product with a id
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send(
                payload.error("Product not found with id " + req.params.id)
            );            
        }
        res.send(payload.success(product));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send(payload.error("Product not found with id " + req.params.id));                
        }
        return res.status(500).send(payload.error("Error retrieving product with id " + req.params.id));
    });
};

// Update a product identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.productId) {
        return res.status(400).send({
            message: "Product Id field can not be empty"
        });
    }

    if(!req.body.price || Number.isNaN(req.body.price) || req.body.price < 0) {
        return res.status(400).send({
            message: "Product price must be a number greater than or equal to zero"
        });
    }

    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.id, {
        productId: req.body.productId,
        name: req.body.name || "Unnamed Product", 
        price: req.body.price
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.id
        });
    });
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.id
        });
    });
};