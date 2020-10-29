'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WishlistSchema extends Schema {
  up () {
    this.create('wishlists', (table) => {
      table.increments()
      
      table
      .integer('customer_id').unsigned().references('id').inTable('customers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      
      table
      .integer('product_id').unsigned().references('id').inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('wishlists')
  }
}

module.exports = WishlistSchema
