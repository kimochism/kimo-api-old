'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()

      table
      .integer('customer_id').unsigned().references('id').inTable('customers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.string('STATUS')

      table.boolean('sent')
      table.boolean('delivered')

      table.float('amount')

      table.float('freight')

      table.float('total')

      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
