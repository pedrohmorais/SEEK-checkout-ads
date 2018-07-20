const Order = require('../models/order.model.js');
const Customer = require('../models/customer.model.js');
const OrderBusiness = require('../business/order.business.js')

async function getCustomerById(customerId){
    return await Customer.findById(customerId)
    .populate({
        path: 'privileges.product',
        model: 'Product'
    })
}
async function getOrdersByCustomer(customerId){
    return await Order.find({ 'customer': customerId })
    .populate('product')
    
}


exports.calculateByCustomer = (req, res) => {
    getCustomerById(req.params.id)
    .then(customer=>{
        // Verify if customer exists
        if(!customer) {
            return res.status(400).send({
                message: "Customer not found with id " + req.body.customer
            });            
        }

        // Get the customer orders
        getOrdersByCustomer(customer._id)
        .then(orders=>{
            if(!orders) {
                return res.status(400).send({
                    message: "Orders not found for customer " + customer.name
                });            
            }

            var orderClass = new OrderBusiness(customer,orders)
            orderClass.calcOrders()
            totalOrder = orderClass.getData()

            res.send(totalOrder);
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred while getting the customer orders."
            });
        })
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    })
}

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if(!req.body.product) {
        return res.status(400).send({
            message: "Order product field can not be empty"
        });
    }
    if(!req.body.customer) {
        return res.status(400).send({
            message: "Order customer field can not be empty"
        });
    }

    getCustomerById(req.body.customer)
    .then(customer=>{
        // Verify if customer exists
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.body.customer
            });            
        }

        // Create a Order
        const order = new Order({
            product: req.body.product,
            customer: req.body.customer
        });

        // Save Order in the database
        order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        });
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    })

    
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Find a single order with a id
exports.findOne = (req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving order with id " + req.params.id
        });
    });
};

// Update a order identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.product) {
        return res.status(400).send({
            message: "Order product field can not be empty"
        });
    }
    if(!req.body.customer) {
        return res.status(400).send({
            message: "Order customer field can not be empty"
        });
    }
    getCustomerById()
    .then(customer=>{
        // Verify if customer exists
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.id
            });            
        }

        // Find order and update it with the request body
        Order.findByIdAndUpdate(req.params.id, {
            product: req.body.product,
            customer: req.body.customer
        }, {new: true})
        .then(order => {
            if(!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            res.send(order);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating order with id " + req.params.id
            });
        });
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Order."
        });
    })
};

// Delete a order with the specified id in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.id)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.id
        });
    });
};