'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel')

const _ = require('lodash')
class Order extends BaseModel {

    products() {
        return this.belongsToMany('App/Models/Product')
            .pivotTable('order_products')
            .pivotModel('App/Models/OrderProduct')
    }

}

module.exports = Order
