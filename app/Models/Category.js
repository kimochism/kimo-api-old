'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel')

class Category extends BaseModel {

    products() {
        return this.belongsToMany('App/Models/Product').pivotTable('product_categories')
    }

    image() {
        return this.belongsTo('App/Models/Image');
    }

}

module.exports = Category
