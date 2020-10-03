'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const BaseModel = use('App/Models/BaseModel')

class ProductCategory extends BaseModel {
    product() {
        return this.belongsTo('App/Models/Product')
    }

    category() {
        return this.belongsTo('App/Models/Category')
    }
}

module.exports = ProductCategory
