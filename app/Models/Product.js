'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const BaseModel = use('App/Models/BaseModel')

class Product extends BaseModel {

    categories() {
        return this.belongsToMany('App/Models/Category').pivotTable('product_categories')
    }

    images() {
        return this.belongsToMany('App/Models/Image').pivotTable('product_images')
    }

    customer() {
        return this.belongsToMany('App/Models/Customer')
            .pivotTable('customer_products')
            .pivotModel('App/Models/Customer');
    }

    wishlist() {
        return this.hasOne('App/Models/Wishlist')
    }

}

module.exports = Product
