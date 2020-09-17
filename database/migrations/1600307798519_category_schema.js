'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()

      table.string('name')

      table
      .integer('image_id').unsigned().references('id').inTable('images')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
