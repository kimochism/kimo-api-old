'use strict'

const CustomerBag = use('App/Models/CustomerBag');
const User = use('App/Models/User');

const QueryBuilderService = use('App/Services/QueryBuilderService');

class CustomerBagController {

  constructor() {
    this.queryBuilderService = new QueryBuilderService();
  }

  async index({ request, response, auth }) {
    const queries = request.get();

    const customerBags = CustomerBag.query();

    const loggedCustomer = this.queryBuilderService.getBooleanQuery(queries.loggedCustomer);

    if (loggedCustomer) {
      const customer = await this.getLoggedCustomer(auth);
      if (!customer) {
        return response.unauthorized('Login first')

      }
  
      customerBags.where('customer_id', customer.id);
    }

    return await customerBags
      .with('product.images')
      .orderBy('id', 'desc')
      .fetch();
  }

  async store({ request, response, auth }) {
    const { productId } = request.all();

    const customer = await this.getLoggedCustomer(auth);

    if (!customer) {
      return response.unauthorized('Login first')
    }

    const where =  { customer_id: customer.id, product_id: productId };
    const create = { ...where, quantity: 0 };

    const customerBag = await CustomerBag.findOrCreate(where, create);

    customerBag.merge({ quantity: customerBag.quantity + 1 });
    await customerBag.save();

    return customerBag;
  }

  async show({ params, request, response }) {
  }

  async update({ params, request, response }) {
    const data = request.all();

    const customerBag = await CustomerBag.find(params.id);

    customerBag.merge(data);
    await customerBag.save();

    return customerBag;
  }

  async destroy({ params, request, response }) {
    const customerBag = await CustomerBag.find(params.id);

    return await customerBag.delete();
  }

  async getLoggedCustomer(auth) {
    const user = await User.find(auth.user.id);
    console.log(user);

    const customer = await user.customer().fetch();
    if (!customer) {
      return;
    }

    return customer;
  }
}

module.exports = CustomerBagController
