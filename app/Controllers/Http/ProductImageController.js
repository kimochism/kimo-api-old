'use strict'

const Product = use('App/Models/Product');

class ProductImageController {

    async store({ request }) {
        const data = request.only(['imageIds', 'productId'])

        const product = await Product.find(data.productId);

        await product.images().attach(data.imageIds);
        await product.load('images');

        return product;
    }

}

module.exports = ProductImageController
