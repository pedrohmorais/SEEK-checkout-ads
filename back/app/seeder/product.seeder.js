const Product = require('../models/product.model.js');

exports.seed = () => {
    console.log("Seeding products...");
    let products = [
        {
            "_id" : "5b4f676843487f5da43df67b",
            "productId" : "classic",
            "name" : "Classic Ad",
            "price" : 269.99,
        },
        {
            "_id" : "5b4f676843487f5da43df67d",
            "productId" : "standout",
            "name" : "Standout Ad",
            "price" : 322.99,
        },
        {
            "_id" : "5b4f676843487f5da43df67c",
            "productId" : "premium",
            "name" : "Premium Ad",
            "price" : 394.99,
        }
    ]
    
    products.forEach(p => {
        let product = new Product(p);
        Product.findById(p._id)
        .then(found => {
            if(found){
                console.log(`Product ${p.name} already inserted`)
            }
            else{
                save(product)
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                save(product)
            }
            console.log(err.message || `Some error occurred while inserting product ${p.name}`)
        });
    });
}

function save(product) {
    product.save()
    .then(data => {
        console.log(`Product ${product.name} inserted.`);
    }).catch(err => {
        console.log(err.message || `Some error occurred while inserting product ${product.name}.`)
    });
}