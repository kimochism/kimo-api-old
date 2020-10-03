'use strict'

const Customer = use('App/Models/Customer'); 

class CustomerController {
  
  async index ({ request, response, view }) {

  }

  async store ({ request, response, auth }) {
    const data = request.all();

    const customer = await Customer.create(data);

    return customer;
  }

  async show ({ params, request, response, view }) {
    const customer = await Customer.find(params.id);

    return customer;
  }

  async update ({ params, request, response }) {
    const customer = await Customer.find(params.id);

    customer.merge(request);

    await customer.save();

    return customer;
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = CustomerController
