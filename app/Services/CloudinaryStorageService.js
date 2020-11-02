'use strict';

const Env = use('Env');
const cloudinary = require('cloudinary').v2;

class CloudinaryStorageService {

    async upload(file) {

        cloudinary.config({
            cloud_name: Env.get("CLOUDINARY_CLOUD_NAME"),
            api_key: Env.get("CLOUDINARY_API_KEY"),
            api_secret: Env.get("CLOUDINARY_API_SECRET"),
        });

        let url = '';

        await cloudinary.uploader.upload(file.tmpPath).then( image => {
            url = image.url;
        });

        return url;
    }
}

module.exports = CloudinaryStorageService
