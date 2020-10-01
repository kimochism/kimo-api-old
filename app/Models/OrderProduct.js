'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderProduct extends Model {
    static get Serializer() {
        return use('App/Models/Serializers/JsonSerializer')
    }
}

module.exports = OrderProduct
