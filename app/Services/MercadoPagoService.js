'use strict';

const Env = use('Env');

const mercadopago = require('mercadopago');


class MercadoPagoService {

    constructor() {
        const accessToken = Env.get('MERCADO_PAGO_ACCESS_TOKEN');
        mercadopago.configurations.setAccessToken(accessToken);
    }

    async savePayment(paymentData) {
        console.log(mercadopago.payment)
        const response = await mercadopago.payment.save(paymentData);
        
        return response;
    }
}

module.exports = MercadoPagoService
