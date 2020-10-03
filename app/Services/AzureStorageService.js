'use strict';

const Env = use('Env');

const fs = require('fs');
const { v4: uuidv4, v4 } = require('uuid')
const azure = require('azure-storage');

class AzureStorageService {

    async upload(file) {
        const container = Env.get('AZURE_STORAGE_CONTAINER');
        const storage = Env.get('AZURE_STORAGE');
        const connectionString = Env.get('AZURE_STORAGE_CONNECTION_STRING');

        const blobSvc = azure.createBlobService(connectionString);

        // Gera um nome único para o arquivo
        let filename = v4() + '.jpg';

        const buffer = await this.imageToBuffer(file);

        // Salva a imagem
        const options = {
            contentType: 'image'
        }

        await blobSvc.createBlockBlobFromText(container, filename, buffer, options, function (error, result, response) {
            if (error) {
                filename = 'default.png'
            }

            filename = result.name;

        });

        const url = `https://${storage}.blob.core.windows.net/${container}/${filename}`;

        return { url };
    }

    async imageToBuffer(file) {
        const buffer = fs.createReadStream(file.tmpPath);
        const chunks = [];
        for await (let chunk of buffer) {
            chunks.push(chunk);
        }

        const pintao = Buffer.concat(chunks);

        return pintao;
    }
}

module.exports = AzureStorageService
