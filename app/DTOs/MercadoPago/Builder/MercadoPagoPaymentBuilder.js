const MercadoPagoPaymentRequest = use('App/DTOs/MercadoPago/Request/MercadoPagoPaymentRequest');
const MercadoPagoPaymentResponse = use('App/DTOs/MercadoPago/Response/MercadoPagoPaymentResponse')

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

    from(response) {
        const mercadoPagoResponse = new MercadoPagoPaymentResponse();
        
        mercadoPagoResponse.status = response.status;
        mercadoPagoResponse.amount = response.transaction_amount;
        mercadoPagoResponse.installments = response.installments;
        mercadoPagoResponse.paymentMethodCode = response.payment_method_id;
        mercadoPagoResponse.paymentType = response.payment_type_id;

        return mercadoPagoResponse;
    }
}

module.exports = MercadoPagoPaymentBuilder
