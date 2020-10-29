'use strict'

const Product = use('App/Models/Product');

const QueryBuilderService = use('App/Services/QueryBuilderService');

class ProductController {

  constructor() {
    this.queryBuilderService = new QueryBuilderService();
  }

  async index({ request, response, auth }) {
    const query = request.get();

    const name = this.queryBuilderService.getQuery('name', query.name);
    const size = this.queryBuilderService.getQuery('size', query.size);
    const color = this.queryBuilderService.getQuery('color', query.color);
    const type = this.queryBuilderService.getQuery('type', query.type);
    const price = this.queryBuilderService.getQuery('price', query.price);
    const discountPrice = this.queryBuilderService.getQuery('discountPrice', query.discountPrice);
    const categoryName = this.queryBuilderService.getQuery('categories.name', query.categoryName);
    const groupBy = this.queryBuilderService.getBooleanQuery(query.groupBy);

    const products = Product.query()
      .with('images')
      .with('categories')
      .whereRaw(name)
      .whereRaw(size)
      .whereRaw(color)
      .whereRaw(type)
      .whereRaw(price)
      .whereRaw(discountPrice)


    if (auth.getAuthHeader()) {
      const user = await auth.getUser();
      const customer = await user.customer().fetch();

      products.with('wishlist', query => {
        query.where('customer_id', customer.id)
      });
    }

    if (groupBy) {
      products.groupByRaw("products.name");
    }

    if (categoryName) {
      products
        .innerJoin('product_categories', 'product_categories.product_id', 'products.id')
        .innerJoin('categories', 'product_categories.category_id', 'categories.id')
        .whereRaw(categoryName)
    }

    if (query.offer) {
      products.whereNotNull('discount_price')
    }

    return await products
      .select('products.*')
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
