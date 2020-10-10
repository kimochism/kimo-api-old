'use strict'

const OrderProduct = use('App/Models/OrderProduct');

class OrderProductController {

    async store({ request }) {
        const data = request.all();
        
        const orderProducts = await OrderProduct.createMany(data.orderProducts);

        return orderProducts;
    }
    
}

module.exports = OrderProductController
