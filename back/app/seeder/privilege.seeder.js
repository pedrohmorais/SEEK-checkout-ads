const Privilege = require('../models/privilege.model.js');

exports.seed = () => {
    console.log("Seeding privileges...");
    let privileges = [
        {
            "type": "takepay",
            "description": "Get take for pay deal on selected plan",
            "product": "5b4f676843487f5da43df67b",
            "take": 3,
            "pay": 2
        },
        {
            'type': 'discount',
            'description': 'Gets a discount when the number of products are greather or equal minAmount',
            'product': '5b4f676843487f5da43df67d',
            'minAmount': 0,
            'priceTo': 299.99
        },
        {
            'type': 'discount',
            'description': 'Gets a discount when the number of products are greather or equal minAmount',
            'product': '5b4f676843487f5da43df67c',
            'minAmount': 4,
            'priceTo': 379.99
        },
        {
            'type': 'takepay',
            'description': 'Get take for pay deal on selected plan',
            'product': '5b4f676843487f5da43df67b',
            'take': 5,
            'pay': 4
        },
        {
            'type': 'discount',
            'description': 'Gets a discount when the number of products are greather or equal minAmount',
            'product': '5b4f676843487f5da43df67d',
            'minAmount': 0,
            'priceTo': 309.99
        },
        {
            'type': 'discount',
            'description': 'Gets a discount when the number of products are greather or equal minAmount',
            'product': '5b4f676843487f5da43df67c',
            'minAmount': 3,
            'priceTo': 389.99
        }
    ]
    
    privileges.forEach(p => {
        let privilege = new Privilege(p);
        Privilege.findById(p._id)
        .then(found => {
            if(found){
                console.log(`Privilege ${p.type} for product ${p.product} already inserted`)
            }
            else{
                save(privilege)
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                save(privilege)
            }
            console.log(err.message || `Some error occurred while inserting privilege ${p.type} for product ${p.product}`)
        });
    });
}

function save(privilege) {
    privilege.save()
    .then(data => {
        console.log(`Privilege ${privilege.type} for product ${privilege.product} inserted.`);
    }).catch(err => {
        console.log(err.message || `Some error occurred while inserting privilege ${privilege.type} for product ${privilege.product}.`)
    });
}