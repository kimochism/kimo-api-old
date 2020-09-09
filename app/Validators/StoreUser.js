'use strict'

class StoreUser {

  async fails(errorMessages) {
    return this.ctx.response.status(422).json(errorMessages);
  }

  get rules() {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'O email deve ser informado.',
      'email.unique': 'Este email já existe.',
      'username.required': 'O nome de usuario deve ser informado.',
      'username.unique': 'Este nome de usuario já existe.',
      'email.email': 'O email deve ser valido.',
      'password.required': 'A senha deve ser informada'
    }
  }

}

module.exports = StoreUser
