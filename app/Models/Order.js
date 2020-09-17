'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

    products() {
        return this.belongsToMany('App/Models/Product')
            .pivotTable('order_products')
            .pivotModel('App/Models/OrderProduct')
    }

}

module.exports = Order
