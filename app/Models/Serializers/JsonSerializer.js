'use strict'

const _ = use('lodash')
const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class JsonSerializer extends VanillaSerializer {
  _getRowJSON (modelInstance) {
    const json = _.transform(modelInstance.toObject(), (result, value, key) => {
      result[_.camelCase(key)] = value
      return result
    }, {})

    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    return json
  }
}

module.exports = JsonSerializer
