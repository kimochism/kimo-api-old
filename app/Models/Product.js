'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static get Serializer() {
        return use('App/Models/Serializers/JsonSerializer')
    }

    categories() {
        return this.belongsToMany('App/Models/Category').pivotTable('product_categories')
    }

    images() {
        return this.belongsToMany('App/Models/Image').pivotTable('product_images')
    }

    customer() {
        return this.belongsToMany('App/Models/Customer').pivotTable('customer_products').pivotModel('App/Models/Customer');
    }

}

module.exports = Product
