'use strict'

const FreightCalculatorService = use('App/Services/FreightCalculatorService');

const CorreiosFreteBuilder = use('App/DTOs/CorreiosFrete/Builder/CorreiosFreteBuilder')


class FreightController {

    constructor() {
        this.freightCalculatorService = new FreightCalculatorService();

        this.correiosFreteBuilder = new CorreiosFreteBuilder();
    }

    async store({ request }) {
        const data = request.all();

        const buildedData = this.correiosFreteBuilder.to(data);

        const correiosResponse = await this.freightCalculatorService.calcPriceAndDelivery(buildedData);

        const buildedResponse = this.correiosFreteBuilder.from(correiosResponse);

        return buildedResponse;
    }
}

module.exports = FreightController
