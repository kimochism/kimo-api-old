'use strict'

const CustomerBag = use('App/Models/CustomerBag');

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
  }

  async destroy({ params, request, response }) {
    const customerBag = await CustomerBag.find(params.id);

    if (customerBag.quantity <= 1) {
      return await customerBag.delete();
    }

    customerBag.merge({ quantity: customerBag.quantity - 1 });
    await customerBag.save();

    return;
  }

  async getLoggedCustomer(auth) {
    const user = await auth.getUser();

    const customer = await user.customer().fetch();
    if (!customer) {
      throw response.unauthorized('Login first')
    }

    return customer;
  }
}

module.exports = CustomerBagController
