'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.table('payments', (table) => {
      // alter table
      table.string('payment_type')
    })
  }

  down () {
    this.table('payments', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PaymentSchema
