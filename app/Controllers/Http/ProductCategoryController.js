'use strict'

const Product = use('App/Models/Product');

class ProductCategoryController {

    async store({ request }) {
        const data = request.only(['categoryIds', 'productId'])

        const product = await Product.find(data.productId);

        await product.categories().attach(data.categoryIds);
        await product.load('categories');

        return product;
    }

}

module.exports = ProductCategoryController
