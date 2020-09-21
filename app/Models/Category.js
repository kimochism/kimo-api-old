'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

    products() {
        return this.belongsToMany('App/Models/Product').pivotTable('product_categories')
    }

    image() {
        return this.belongsTo('App/Models/Image');
    }

}

module.exports = Category
