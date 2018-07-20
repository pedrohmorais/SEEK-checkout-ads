const Product = require('../models/product.model.js');
const productsData = require('./data/products.js')

exports.seed = () => {
    console.log("Seeding products...");
    let products = productsData.value
    
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