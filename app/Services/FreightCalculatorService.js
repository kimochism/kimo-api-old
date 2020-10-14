'use strict';

var xml2js = require('xml2js');

const BaseService = use('App/Services/BaseService');

const Env = use('Env');
const ServiceURLs = use('App/Utils/ServiceURLs');
const apiUrl = Env.get('CORREIOS_FRETE_URL');

class FreightCalculatorService extends BaseService {

    constructor() {
        super(apiUrl);
    }

    async calcPriceAndDelivery(params) {
        const response = await this.get(ServiceURLs.CALC_PRECO_PRAZO, null, params);

        if (response) {
            var parser = new xml2js.Parser({ 'async': true, 'attrkey': '@', 'explicitArray': false });

            const result = await parser.parseStringPromise(response);

            return result.Servicos.cServico;
        }
    }
}

module.exports = FreightCalculatorService
