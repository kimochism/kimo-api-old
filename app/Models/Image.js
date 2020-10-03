'use strict'


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('App/Models/BaseModel')


class Image extends BaseModel {
    product() {
        return this.belongsToMany('App/Models/Product').pivotTable('product_images')
    }

}

module.exports = Image
