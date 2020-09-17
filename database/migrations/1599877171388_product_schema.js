'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()

      table.string('name')
      table.string('size')
      table.string('color')
      table.string('type')
      table.string('price')
      table.string('discount_price')
      table.integer('quantity')

      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
