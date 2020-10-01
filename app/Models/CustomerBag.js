'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CustomerBag extends Model {

    static get Serializer() {
        return use('App/Models/Serializers/JsonSerializer')
    }

    product() {
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = CustomerBag
