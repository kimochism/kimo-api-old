const axios = require('axios');

class BaseService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async post(serviceUrl, data, paramsValues = null, queryValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues, queryValues);
        const headers = this.prepareHeader();

        try {
            const response = await axios.post(endpoint, data, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async get(serviceUrl, paramsValues = null, queryValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues, queryValues);
        const headers = this.prepareHeader();

        try {
            const response = await axios.get(endpoint, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async put(serviceUrl, data, paramsValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues);
        const headers = this.prepareHeader();

        try {
            const response = await axios.put(endpoint, data, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async patch(serviceUrl, data, paramsValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl);
        const headers = this.prepareHeader();

        try {
            const response = await axios.patch(endpoint, data, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    async delete(serviceUrl, paramsValues = null) {
        const endpoint = this.prepareEndpoint(serviceUrl, paramsValues);
        const headers = this.prepareHeader();

        try {
            const response = await axios.delete(endpoint, headers);
            return response.data;
        } catch (e) {
            return e;
        }
    }

    /**
     * Prepara o header que será enviado
     *
     * @param {object} headers
    */
    prepareHeader(headers) {
        const buildedHeaders = {
            'Content-Type': 'application/json'
        };

        return { headers: buildedHeaders };
    }

    /**
     * Prepara o endpoint da requisição
     *
     * @param {Enum} serviceUrl
     * @param {[string]} paramsValues
     * @param {object} queryValues
    */
    prepareEndpoint(serviceUrl, paramsValues = null, queryValues = null) {
        const path = this.buildPathParams(serviceUrl, paramsValues);

        const queries = this.buildQueryParams(queryValues) || '';

        const endpoint = this.apiUrl.concat(path).concat(queries);
        return encodeURI(endpoint);
    }

    /**
     * Prepara os path params a serem enviados
     *
     * @param {Enum} serviceUrl
     * @param {[string]} paramsValues
    */
    buildPathParams(serviceUrl, paramsValues) {
        let path = serviceUrl;
        const paramKeys = path.match(/\{.*?\}/g) || [];

        if (!paramKeys && !paramsValues) {
            return path;
        }

        for (const key in paramsValues) {
            path = path.replace(paramKeys[key], paramsValues[key]);
        }
        return path.replace(/ /g, '');
    }

    /**
     * Prepara os query params a serem enviados
     *
     * @param {object} query
    */
    buildQueryParams(query) {
        if (!query) { return; }

        const buildedQuery = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        return '?'.concat(buildedQuery);
    }
}

module.exports = BaseService
