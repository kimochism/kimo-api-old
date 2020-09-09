'use strict'

const User = use('App/Models/User')

class UserController {

    async auth({ request, auth }) {
        const { email, password } = request.all()
        await auth.attempt(email, password)

        return 'Logged in successfully'
    }

    async store({ request, response }) {
        const data = request.only(['username', 'email', 'password']);
        
        const user = await User.create(data);
        return user;
    }
}

module.exports = UserController
