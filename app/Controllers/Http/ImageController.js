'use strict'

const AzureStorageIntegrator = use('App/Integrations/Azure/Storage/AzureStorageIntegrator');

const Image = use('App/Models/Image')

class ImageController {

  constructor() {
    this.azureStorageIntegrator = new AzureStorageIntegrator();
  }

  async index ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const data = request.all();

    const file = request.file('file', {
      types: ['image'],
      size: '10mb',
      extnames: ['png', 'jpg', 'jpeg'],
    });

    const uploadedImage = await this.azureStorageIntegrator.upload(file);

    const image = await Image.create({
      url: uploadedImage.url,
      product_id: data.productId
    });

    return image;
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ImageController
