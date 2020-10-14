const CorreiosFreteRequest = require("../Request/CorreiosFreteRequest");

class CorreiosFreteResponse {
    
    constructor() {
        this.code;
        this.amount;
        this.deliveryTime;
        this.amountWithoutAdditional;
        this.amountOwnHand;
        this.amountReceivement;
        this.amountDeclared;
        this.homeDelivery;
        this.deliverySaturday;
        this.notes;
        this.error;
        this.errorMessage;
    }

}

module.exports = CorreiosFreteResponse
