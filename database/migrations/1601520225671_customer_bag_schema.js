'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerBagSchema extends Schema {
  up () {
    this.create('customer_bags', (table) => {
      table.increments()
      
      table
      .integer('product_id').unsigned().references('id').inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
      .integer('customer_id').unsigned().references('id').inTable('customers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('quantity')

      table.timestamps()
    })
  }

  down () {
    this.drop('customer_bags')
  }
}

module.exports = CustomerBagSchema
