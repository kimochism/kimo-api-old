'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */

const Product = use('App/Models/Product');

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const query = request.get();
    
    const name = this.getQuery('name', query.name);
    const size = this.getQuery('size', query.size);
    const color = this.getQuery('color', query.color);
    const type = this.getQuery('type', query.type);
    const price = this.getQuery('price', query.price);
    const discountPrice = this.getQuery('discount_price', query.discountPrice);
    
    const products = Product.query()
      .where(name)
      .where(size)
      .where(color)
      .where(type)
      .where(price)
      .where(discountPrice)

    if (query.offer) {
      products.whereNotNull('discount_price')
    }

    return await products
      .orderBy('products.id', 'desc')
      .paginate(query.page, query.limit);
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all();

    const product = await Product.create(data);

    return product;
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const product = await Product.find(params.id);

    return product;
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.all();

    const product = await Product.find(params.id);

    product.merge(data);
    await product.save();

    return product;
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const product = await Product.find(params.id);

    product.delete();
  }

  getQuery(name, param, condition = 'like') {

    if (!param) {
      return '';
    }

    const list = param.split(',');

    const variable = condition === 'like' ? '%?%' : '?';
    const query = this.queryBuilder(`${name} ${condition} '${variable}'`, 'OR', list);

    if (query.trim()) {
      return `(${query.trim()})`;
    }

    return '';
  }

}

module.exports = ProductController
