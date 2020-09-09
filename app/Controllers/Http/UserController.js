'use strict'

const User = use('App/Models/User');
const Customer = use('App/Models/Customer');

class UserController {

    async auth({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)
    
        return token
    }

    async store({ request, response }) {
        const data = request.only(['username', 'email', 'password']);

        const user = await User.create(data);
        return user;
    }
}

module.exports = UserController
