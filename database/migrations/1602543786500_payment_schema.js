'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.table('payments', (table) => {
      // alter table

      table
      .integer('order_id').unsigned().references('id').inTable('orders')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      
      table.string('status')
      table.float('amount')
      table.integer('installments')
      table.string('payment_method_code')
    })
  }

  down () {
    this.table('payments', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PaymentSchema
