'use strict'

const Product = use('App/Models/Product');

class ProductController {

  async index({ request, response, view }) {
    const query = request.get();
    
    const name = this.getQuery('name', query.name);
    const size = this.getQuery('size', query.size);
    const color = this.getQuery('color', query.color);
    const type = this.getQuery('type', query.type);
    const price = this.getQuery('price', query.price);
    const discountPrice = this.getQuery('discount_price', query.discountPrice);
    
    const products = Product.query()
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

    await product.load('images');

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

  async storeProductCategories({ params, request }) {
    const data = request.only(['categoryIds'])

    const product = await Product.find(params.id);

    await product.categories().attach(data.categoryIds);

    await product.load('categories');

    return product;
  }

  async storeProductImages({ params, request }) {
    const data = request.only(['imageIds'])

    const product = await Product.find(params.id);

    await product.images().attach(data.imageIds);

    await product.load('images');

    return product;
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

  queryBuilder(operation, condition, values) {

    if (!values) {
        return '';
    }

    let query = '';
    for (let i = 0; i < values.length; i++) {
        const tempQuery = `${operation}`.replace('?', values[i].trim());
        query += ` ${tempQuery}`;
        if (i < values.length - 1) {
            query += ` ${condition}`;
        }
    }
    return query;
}

}

module.exports = ProductController
