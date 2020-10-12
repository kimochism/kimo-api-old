'use strict'

const Payment = use('App/Models/Payment');

const MercadoPagoPaymentBuilder = use('App/DTOs/MercadoPago/Builder/MercadoPagoPaymentBuilder')

const MercadoPagoService = use('App/Services/MercadoPagoService');

class PaymentController {

  constructor() {
    this.mercadoPagoPaymentBuilder = new MercadoPagoPaymentBuilder();
    this.mercadoPagoService = new MercadoPagoService();
  }

  async index ({ request, response }) {
  }

  async store ({ request, response }) {
    const data = request.all();
    const paymentRequest = this.mercadoPagoPaymentBuilder.to(data);
    
    const paymentResponse = await this.mercadoPagoService.savePayment(paymentRequest);

    return paymentResponse;
  }

  async show ({ params, request, response }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = PaymentController
