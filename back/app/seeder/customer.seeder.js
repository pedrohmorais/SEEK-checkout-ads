const Customer = require('../models/customer.model.js');
const mongoose = require('mongoose');

exports.seed = () => {
    console.log("Seeding customers...");
    let customers = [
        {
            "_id" : "5b50b8c5aecf1464c8a2a9f5",
            "name": "UNILEVER",
            "privileges":[
                {
                    'type': 'takepay',
                    'description': 'Get take for pay deal on selected plan',
                    'product': mongoose.Types.ObjectId('5b4f676843487f5da43df67b'),
                    'take': 3,
                    'pay': 2
                }
            ]
        },
        {
            "_id" : "5b50b8c5aecf1464c8a2a9f6",
            "name": "APPLE",
            "privileges":[
                {
                    'type': 'discount',
                    'description': 'Gets a discount when the number of products are greather or equal minAmount',
                    'product': mongoose.Types.ObjectId('5b4f676843487f5da43df67d'),
                    'minAmount': 0,
                    'priceTo': 299.99
                }
            ]
        },
        {
            "_id" : "5b50b8c5aecf1464c8a2a9f7",
            "name": "NIKE",
            "privileges":[
                {
                    'type': 'discount',
                    'description': 'Gets a discount when the number of products are greather or equal minAmount',
                    'product': mongoose.Types.ObjectId('5b4f676843487f5da43df67c'),
                    'minAmount': 4,
                    'priceTo': 379.99
                }
            ]
        },
        {
            "_id" : "5b50b8c5aecf1464c8a2a9f8",
            "name": "FORD",
            "privileges":
            [
                {
                    'type': 'takepay',
                    'description': 'Get take for pay deal on selected plan',
                    'product': mongoose.Types.ObjectId('5b4f676843487f5da43df67b'),
                    'take': 5,
                    'pay': 4
                },
                {
                    'type': 'discount',
                    'description': 'Gets a discount when the number of products are greather or equal minAmount',
                    'product': mongoose.Types.ObjectId('5b4f676843487f5da43df67d'),
                    'minAmount': 0,
                    'priceTo': 309.99
                },
                {
                    'type': 'discount',
                    'description': 'Gets a discount when the number of products are greather or equal minAmount',
                    'product': mongoose.Types.ObjectId('5b4f676843487f5da43df67c'),
                    'minAmount': 3,
                    'priceTo': 389.99
                }
            ]
        }
    ]
    
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