const Order = require('../models/order.model.js');
const mongoose = require('mongoose');

exports.seed = () => {
    console.log("Seeding orders...");
    let orders = [
        // Nike
        {
            "_id" : mongoose.Types.ObjectId("5b510233254cee76f85d62d0"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f7"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b5102f4254cee76f85d62d1"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f7"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b5102f5254cee76f85d62d2"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f7"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b5102f6254cee76f85d62d3"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f7"),
        },
        // Unilever
        {
            "_id" : mongoose.Types.ObjectId("5b51d287b9c1005f50349c23"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f5"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51d292b9c1005f50349c24"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67b"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f5"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51d294b9c1005f50349c25"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67b"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f5"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51d295b9c1005f50349c26"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67b"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f5"),
        },
        // Apple
        {
            "_id" : mongoose.Types.ObjectId("5b51dc61f000e13b24e62c52"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67d"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f6"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51dc62f000e13b24e62c53"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67d"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f6"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51dc63f000e13b24e62c54"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67d"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f6"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51dc68f000e13b24e62c55"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f6"),
        },
        // Ford
        {
            "_id" : mongoose.Types.ObjectId("5b51de08f000e13b24e62c56"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de13f000e13b24e62c57"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de14f000e13b24e62c58"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67c"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de1bf000e13b24e62c59"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67d"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de1df000e13b24e62c5a"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67d"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de1ef000e13b24e62c5b"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67d"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de24f000e13b24e62c5c"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67b"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de25f000e13b24e62c5d"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67b"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        },
        {
            "_id" : mongoose.Types.ObjectId("5b51de26f000e13b24e62c5e"),
            "product" : mongoose.Types.ObjectId("5b4f676843487f5da43df67b"),
            "customer" : mongoose.Types.ObjectId("5b50b8c5aecf1464c8a2a9f8"),
        }
    ]
    
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