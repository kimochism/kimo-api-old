'use strict'

const Wishlist = use('App/Models/Wishlist');

class WishlistController {

  async index ({ request, response, view }) {
  }

  async show ({ params, request, response, view }) {
  }

  async store ({ request, auth }) {
    const data = request.only(['productId']);

    const user = await auth.getUser();
    const customer = await user.customer().fetch();

    const wishlist = await Wishlist.create({ customerId: customer.id, productId: data.productId });

    return wishlist;
  }

  async destroy ({ params, response, auth }) {
    const user = await auth.getUser();
    const customer = await user.customer().fetch();

    await Wishlist
      .query()
      .where('customer_id', customer.id)
      .where('product_id', params.productId)
      .delete();

      return response.status(200).json({ message: 'OK' });
  }

  async update ({ params, request, response }) {
  }

}

module.exports = WishlistController
