const Order = require('../models/order.model.js');
const mongoose = require('mongoose');
const ordersData = require('./data/orders.js') 

exports.seed = () => {
    console.log("Seeding orders...");
    let orders = ordersData.value
    
    orders.forEach(o => {
        let order = new Order(o);
        Order.findById(o._id)
        .then(found => {
            if(found){
                console.log(`Order ${o._id} already inserted`)
            }
            else{
                save(order)
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                save(order)
            }
            console.log(err.message || `Some error occurred while inserting order ${o._id}`)
        });
    });
}

function save(order) {
    order.save()
    .then(data => {
        console.log(`Order ${order._id} inserted.`);
    }).catch(err => {
        console.log(err.message || `Some error occurred while inserting order ${order._id}.`)
    });
}