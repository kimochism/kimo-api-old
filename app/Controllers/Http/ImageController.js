'use strict'

// const AzureStorageService = use('App/Services/AzureStorageService');
const CloudinaryStorageService = use('App/Services/CloudinaryStorageService');

const Image = use('App/Models/Image')

class ImageController {

  constructor() {
    this.CloudinaryStorageService = new CloudinaryStorageService();
  }

  async index ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const data = request.all();
    
    const uploadedImage = await this.CloudinaryStorageService.upload(request.file('file'));

    const image = await Image.create({ url: uploadedImage });

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
