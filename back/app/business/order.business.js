class OrderBusiness {
    constructor(customer, orders) {
        this.customer = customer;
        this.orders = orders;
        this.total = 0;
        this.skus = []
        this.amountProducts = []
        this.privileges = customer.privileges
    }

    // Check if privilege is valid
    validatePrivileges(){
        return !this.privileges || this.privileges.length==0
    }

    // Verifies and calculates simple orders 
    verifySimpleOrders(){
        if(this.validatePrivileges()){
            this.orders.forEach(order => {
                this.total += order.product.price
                this.skus.push(order.product.productId)
            });
        }
    }

    // Validates rule discount
    validateRuleDiscount(minAmount,amountP){
        return  !Number.isInteger(minAmount) || 
                minAmount <= amountP
    }
    // Validates rule takepay
    validateRuleTakePay(orderRule){
        return  orderRule.take && orderRule.pay &&
                Number.isInteger(orderRule.take) && Number.isInteger(orderRule.pay) &&
                orderRule.take > orderRule.pay
    }

    // Apply the privileges to the current order
    applyPrivileges(order){
        let newPrice = order.product.price
        let amountP = this.amountProducts[order.product._id]
        let newAmount = amountP
        this.privileges.forEach(orderRule => {
            if(order.product._id.toString() == orderRule.product._id.toString()) {
                switch (orderRule.type) {
                    case "discount":
                        // Sets new price
                        if(this.validateRuleDiscount(orderRule.minAmount,amountP)) {
                            newPrice = orderRule.priceTo ? orderRule.priceTo : newPrice;
                        }
                        break;
                    case "takepay":
                        if(this.validateRuleTakePay(orderRule)) {
                            // Removes the free products from amount 
                            let takeDiff = Math.floor(amountP/orderRule.take)
                            newAmount = takeDiff == 0 ? amountP : (takeDiff) * orderRule.pay
                        }
                        break;
                    default:
                        break;
                }
            }
        });
        // Calculates new price and new amount to total value
        this.total += newPrice * newAmount
    }

    // Set the amount of products duplicated
    setAmoutProducts(order){
        let amountP = this.orders.filter(o=>o.product._id.toString()==order.product._id.toString())
        amountP = amountP && amountP.length > 0 ? amountP.length : 0
        this.amountProducts[order.product._id] = amountP
    }

    //Calculates the order value based in the customer pricing rules
    calcOrders(){
        const privileges = this.customer.privileges

        this.verifySimpleOrders()

        this.orders.forEach(order => {
            if(!order.product) {
                return;
            }
            // Adds sku to array
            this.skus.push(order.product.productId)
            
            if(!this.amountProducts[order.product._id]){
                this.setAmoutProducts(order)
            }
            else {
                // This action can execute once one time per product id, so if is repeated, the action breaks
                return;
            }
            // Apply the rules
            this.applyPrivileges(order)
        });
    }

    // Get parsed data from order by customer
    getData(){
        return {
            customerId: this.customer._id,
            customerName: this.customer.name,
            skus:this.skus.sort(),
            total:this.total
        }
    }
    
}
module.exports = OrderBusiness