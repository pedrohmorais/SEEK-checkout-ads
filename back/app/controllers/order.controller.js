const Order = require('../models/order.model.js');
const Customer = require('../models/customer.model.js');

//Calculates the order value based in the customer pricing rules
function calcOrders(customer,orders){
    const privileges = customer.privileges
    var total = 0
    var skus = []

    if(!privileges || privileges.length==0){
        orders.forEach(order => {
            total += order.product.price
            skus.push(order.product.productId)
        });
    }

    var amountProducts = []
    orders.forEach(order => {
        var amountP = 0
        if(!amountProducts[order.product._id]){
            amountP = orders.filter(o=>o.product._id==order.product._id)
            amountP = amountP && amountP.length > 0 ? amountP.length : 0
            amountProducts[order.product._id] = amountP
        }
        amountP = amountProducts[order.product._id]

        // Apply the rules
        privileges.forEach(privilege => {
            if(privilege.product._id == order.product._id) {
                switch (orderRule.type) {
                    case "discount":
                        //continue from here
                        break;
                    case "takepay":
                        
                        break;
                    default:
                        break;
                }
            }
        });

        skus.push(order.product.productId)
        total += order.product.price
    });


    // let orderRules = rules.filter(rule => rule.product._id === order.product._id)
    // if(orderRules && orderRules.length>0){
    //     orderRules.forEach(orderRule => {
    //         switch (orderRule.type) {
    //             case "discount":
                    
    //                 break;
    //             case "takepay":
                    
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });
    // }
    return {
        customerId: customer._id,
        customerName: customer.name,
        skus:skus,
        total:total
    }
}

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

            let resp = {
                customer: customer,
                orders: orders
            }
            //res.send(resp);

            totalOrder = calcOrders(customer,orders)

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