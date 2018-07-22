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

test('Calculate customers orders', (t) => {
    let customers = customersData.value
    let expecteds = [
        {
            "customerId": "5b54b40b26c9bb315072b43d",
            "customerName": "DEFAULT",
            "skus": [
                "classic",
                "premium",
                "standout"
            ],
            "total": 987.97
        },
        {
            "customerId": "5b50b8c5aecf1464c8a2a9f5",
            "customerName": "UNILEVER",
            "skus": [
                "classic",
                "classic",
                "classic",
                "premium"
            ],
            "total": 934.97
        },
        {
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
        },
        {
            "customerId": "5b50b8c5aecf1464c8a2a9f7",
            "customerName": "NIKE",
            "skus": [
                "premium",
                "premium",
                "premium",
                "premium"
            ],
            "total": 1519.96
        },
        {
            "customerId": "5b50b8c5aecf1464c8a2a9f6",
            "customerName": "APPLE",
            "skus": [
                "premium",
                "standout",
                "standout",
                "standout"
            ],
            "total": 1294.96
        }
    ]

    customers.forEach(customer => {
        //var customer = customers.find(c=>c._id=="5b50b8c5aecf1464c8a2a9f8")
        let expected = expecteds.find(c=>c.customerId==customer._id)
        if(!expected || expected==null){
            return
        }
        var orders = ordersData.value.filter(o=>o.customer==customer._id)

        orders = mapOrderProducts(orders)

        var orderClass = new OrderBusiness(customer,orders)
        orderClass.calcOrders();
        totalOrder = orderClass.getData();
        

        t.assert(
            totalOrder._id === expected._id && 
            totalOrder.customerName === expected.customerName && 
            totalOrder.total === expected.total
            , `Testing customer ${customer.name} id : ${customer._id}, total: ${totalOrder.total}, skus: ${totalOrder.skus.join(", ")}`)
    });
    t.end() 
})