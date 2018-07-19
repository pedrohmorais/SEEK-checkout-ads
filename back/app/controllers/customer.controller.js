const Customer = require('../models/customer.model.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Customer name field can not be empty"
        });
    }

    // Create a Customer
    const customer = new Customer({
        name: req.body.name,
        description: req.body.privileges || []
    });

    // Save Customer in the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};

async function pvtFindAll(){
    return await Customer.find()
    .populate({
        path: 'privileges.product',
        model: 'Product'
    })
}

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    pvtFindAll()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

// Find a single customer with a id
exports.findOne = (req, res) => {
    Customer.findById(req.params.id)
    .populate({
        path: 'privileges.product',
        model: 'Product'
    })
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.id
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.id
        });
    });
};

// Update a customer identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Customer name field can not be empty"
        });
    }

    // Find customer and update it with the request body
    Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.privileges || []
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.id
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.id
        });
    });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.id)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.id
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.id
        });
    });
};


