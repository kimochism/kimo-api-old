'use strict'

const User = use('App/Models/User');
class UserController {

    async a () {
        return await User.all();
    }
}

module.exports = UserController
