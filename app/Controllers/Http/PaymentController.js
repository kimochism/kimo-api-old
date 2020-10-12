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
    
    const mercadoPagoResponse = await this.mercadoPagoService.savePayment(paymentRequest);

    if (mercadoPagoResponse && mercadoPagoResponse.status === 201 || mercadoPagoResponse.status === 200) {
      const paymentResponse = this.mercadoPagoPaymentBuilder.from(mercadoPagoResponse.response);
  
      paymentResponse.orderId = data.orderId;

      const payment = await Payment.create(paymentResponse);
      return payment;
    }
  }

  async show ({ params, request, response }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = PaymentController
