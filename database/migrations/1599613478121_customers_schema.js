'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      
      table.increments()

      table.string('full_name')
      table.string('email')
      table.string('birth_date')
      table.string('document')
      table.string('cell_phone_number')

      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
