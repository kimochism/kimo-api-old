'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const BaseModel = use('App/Models/BaseModel')

class CustomerBag extends BaseModel {

    product() {
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = CustomerBag
