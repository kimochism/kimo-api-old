'use strict'

const Category = use('App/Models/Category');

class CategoryController {

  async index({ request, response }) {
    const query = request.get();

    const categories = await Category.all();

    return categories;
  }

  async store({ request, response }) {
    const data = request.all();

    const category = await Category.create(data);

    return category;
  }

  async show({ params, request, response }) {
  }

  async update({ params, request, response }) {
    const data = request.all();

    const category = await Category.find(params.id);

    category.merge(data);
    await category.save();

    return category;
  }

  async destroy({ params, request, response }) {
    const category = await Category.find(params.id);

    category.delete();
  }

  async indexCategoryProducts({ params }) {
    const category = await Category.find(params.id);

    await category.load('products');

    return category;
  }
}

module.exports = CategoryController
