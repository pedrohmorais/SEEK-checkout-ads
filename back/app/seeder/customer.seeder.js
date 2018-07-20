const Customer = require('../models/customer.model.js');
const mongoose = require('mongoose');
const customersData = require('./data/customers.js') 

exports.seed = () => {
    console.log("Seeding customers...");
    let customers = customersData.value
    customers.forEach(p => {
        let customer = new Customer(p);
        Customer.findById(p._id)
        .then(found => {
            if(found){
                console.log(`Customer ${p.name} already inserted`)
            }
            else{
                save(customer)
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                console.log('saving customer')
                save(customer)
            }
            console.log(err.message || `Some error occurred while inserting customer ${p.name}`)
        });
    });
}

function save(customer) {
    customer.save()
    .then(data => {
        console.log(`Customer ${customer.name} inserted.`);
    }).catch(err => {
        console.log(err.message || `Some error occurred while inserting customer ${customer.name}.`)
    });
}