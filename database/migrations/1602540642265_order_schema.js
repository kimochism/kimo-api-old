'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up() {
    this.table('orders', (table) => {
      // alter table

      table.renameColumn('STATUS', 'status')

      table.dropColumn('sent')
      table.dropColumn('delivered')
    })
  }

  down() {
    this.table('orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = OrderSchema
