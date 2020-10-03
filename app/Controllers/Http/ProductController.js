'use strict'

const Product = use('App/Models/Product');

const QueryBuilderService = use('App/Services/QueryBuilderService');

class ProductController {

  constructor() {
    this.queryBuilderService = new QueryBuilderService();
  }

  async index({ request, response, view }) {
    const query = request.get();

    const name = this.queryBuilderService.getQuery('name', query.name);
    const size = this.queryBuilderService.getQuery('size', query.size);
    const color = this.queryBuilderService.getQuery('color', query.color);
    const type = this.queryBuilderService.getQuery('type', query.type);
    const price = this.queryBuilderService.getQuery('price', query.price);
    const discountPrice = this.queryBuilderService.getQuery('discount_price', query.discountPrice);

    const products = Product.query()
      .with('images')
      .with('categories')
      .whereRaw(name)
      .whereRaw(size)
      .whereRaw(color)
      .whereRaw(type)
      .whereRaw(price)
      .whereRaw(discountPrice)

    if (query.offer) {
      products.whereNotNull('discount_price')
    }

    return await products
      .orderBy('products.id', 'desc')
      .paginate(query.page, query.limit);
  }

  async store({ request, response }) {
    const data = request.all();

    const product = await Product.create(data);

    return product;
  }

  async show({ params, request, response, view }) {
    const product = await Product.find(params.id);

    await product.loadMany(['images', 'categories']);

    return product;
  }

  async update({ params, request, response }) {
    const data = request.all();

    const product = await Product.find(params.id);

    product.merge(data);
    await product.save();

    return product;
  }

  async destroy({ params, request, response }) {
    const product = await Product.find(params.id);

    product.delete();
  }
}

module.exports = ProductController
