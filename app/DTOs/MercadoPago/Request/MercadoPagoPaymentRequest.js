class MercadoPagoPaymentRequest {
    
    constructor() {
        this.transaction_amount;
        this.token;
        this.description;
        this.installments;
        this.payment_method_id;
        this.issuer_id;

        this.payer = {
            email: '',
            identification: {
                type: '',
                number: ''
            }
        }
    }

}

module.exports = MercadoPagoPaymentRequest