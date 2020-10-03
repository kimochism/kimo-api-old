'use_strict'

const _ = require('lodash');

const Model = use('Model');

class BaseModel extends Model {

    static get Serializer() {
        return use('App/Models/Serializers/JsonSerializer')
    }

    static boot() {
        super.boot()

        this.addHook('beforeSave', async (modelInstance) => {
            const newModel = _.mapKeys(modelInstance.$attributes, (value, key) => _.snakeCase(key));

            modelInstance.$attributes = newModel;
        })
    }

}

module.exports = BaseModel