const mongoose = require('mongoose');
exports.value = [
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