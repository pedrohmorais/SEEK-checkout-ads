const test = require('tape')
const OrderBusiness = require('../app/business/order.business.js')
const customersData = require('../app/seeder/data/customers.js') 
const ordersData = require('../app/seeder/data/orders.js') 
const productsData = require('../app/seeder/data/products.js') 

function mapOrderProducts(orders) {
    let products = productsData.value
    orders.forEach(order => {
        order.product = products.find(p=>p._id == order.product)
    });
    return orders
}

test('Calculate customer order', (t) => {
    let customers = customersData.value
    var customer = customers.find(c=>c._id=="5b50b8c5aecf1464c8a2a9f8")
    var orders = ordersData.value.filter(o=>o.customer==customer._id)

    orders = mapOrderProducts(orders)

    var orderClass = new OrderBusiness(customer,orders)
    orderClass.calcOrders();
    totalOrder = orderClass.getData();
    let expected = {
        "customerId": "5b50b8c5aecf1464c8a2a9f8",
        "customerName": "FORD",
        "skus": [
            "classic",
            "classic",
            "classic",
            "premium",
            "premium",
            "premium",
            "standout",
            "standout",
            "standout"
        ],
        "total": 2909.91
    }

    t.assert(
        totalOrder._id === expected._id && 
        totalOrder.customerName === expected.customerName && 
        totalOrder.total === expected.total
        , `Testing customer ${customer.name} id : ${customer._id}`)
    t.end()  
})