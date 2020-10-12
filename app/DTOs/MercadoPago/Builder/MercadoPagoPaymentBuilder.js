const MercadoPagoPaymentRequest = use('App/DTOs/MercadoPago/Request/MercadoPagoPaymentRequest');


class MercadoPagoPaymentBuilder {

    constructor() { }

    to(request) {
        const mercadoPagoRequest = new MercadoPagoPaymentRequest();

        mercadoPagoRequest.transaction_amount = parseInt(request.amount);
        mercadoPagoRequest.token = request.token;
        mercadoPagoRequest.description = request.description;
        mercadoPagoRequest.installments = parseInt(request.installments);
        mercadoPagoRequest.payment_method_id = request.paymentMethodId;

        if (request.issuerId) {
            mercadoPagoRequest.issuer_id = request.issuerId
        }

        mercadoPagoRequest.payer = {
            email: request.payer.email,
            identification: {
                type: request.payer.identification.type,
                number: request.payer.identification.number
            }
        }

        return mercadoPagoRequest;
    }
}

module.exports = MercadoPagoPaymentBuilder
