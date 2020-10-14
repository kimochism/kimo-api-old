const CorreiosFreteRequest = use('App/DTOs/CorreiosFrete/Request/CorreiosFreteRequest');
const CorreiosFreteResponse = use('App/DTOs/CorreiosFrete/Response/CorreiosFreteResponse')

class MercadoPagoPaymentBuilder {

    constructor() { }

    to(request) {
        const correiosFreteRequest = new CorreiosFreteRequest();

        correiosFreteRequest.sCepOrigem = request.originZipcode;
        correiosFreteRequest.sCepDestino = request.destinyZipcode;
        correiosFreteRequest.nVlPeso = request.weight;
        correiosFreteRequest.nCdFormato = request.format;
        correiosFreteRequest.nVlComprimento = request.length;
        correiosFreteRequest.nVlAltura = request.height;
        correiosFreteRequest.nVlLargura = request.width;
        correiosFreteRequest.nVlDiametro = request.diameter;
        correiosFreteRequest.sCdMaoPropria = request.ownHand;
        correiosFreteRequest.nVlValorDeclarado = request.amount;
        correiosFreteRequest.sCdAvisoRecebimento = request.receivement;
        correiosFreteRequest.StrRetorno = 'xml';
        correiosFreteRequest.nCdServico = request.serviceCode;

        return correiosFreteRequest;
    }

    from(response) {
        const correiosFreteResponse = new CorreiosFreteResponse();

        correiosFreteResponse.code = response.Codigo;
        correiosFreteResponse.amount = response.Valor;
        correiosFreteResponse.deliveryTime = response.PrazoEntrega;
        correiosFreteResponse.amountWithoutAdditional = response.ValorSemAdicionais;
        correiosFreteResponse.amountOwnHand = response.ValorMaoPropria;
        correiosFreteResponse.amountReceivement = response.ValorAvisoRecebimento;
        correiosFreteResponse.amountDeclared = response.ValorValorDeclarado;
        correiosFreteResponse.homeDelivery = response.EntregaDomiciliar;
        correiosFreteResponse.deliverySaturday = response.EntregaSabado;
        correiosFreteResponse.notes = response.obsFim;
        correiosFreteResponse.error = response.Erro;
        correiosFreteResponse.errorMessage = response.MsgErro;

        return correiosFreteResponse;
    }
}

module.exports = MercadoPagoPaymentBuilder
// {
// 	"sCepOrigem": "08150080",
// 	"sCepDestino": "06730000",
// 	"nVlPeso": "5",
// 	"nCdFormato": "1",
// 	"nVlComprimento": "16",
// 	"nVlAltura": "5",
// 	"nVlLargura": "15",
// 	"nVlDiametro": "0",
// 	"sCdMaoPropria": "s",
// 	"nVlValorDeclarado": "200",
// 	"sCdAvisoRecebimento": "n",
// 	"StrRetorno": "xml",
// 	"nCdServico": "40010"
// }