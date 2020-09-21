'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerProductSchema extends Schema {
  up () {
    this.create('customer_products', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_products')
  }
}

module.exports = CustomerProductSchema
