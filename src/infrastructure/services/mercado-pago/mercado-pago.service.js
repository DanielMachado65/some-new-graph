const mercadoPago = require("mercadopago");
const { isDevEnv } = require("../../config/config");

const ACCESS_TOKEN = isDevEnv
  ? process.env.MERCADO_PAGO_DEV_ACCESS_TOKEN
  : process.env.MERCADO_PAGO_PROD_ACCESS_TOKEN;
const NOTIFICATION_URL = process.env.MERCADO_PAGO_NOTIFICATION_URL;

mercadoPago.configurations.setAccessToken(ACCESS_TOKEN);

const createPayment = async (paymentData) => {
  const data = {
    notification_url: NOTIFICATION_URL,
    transaction_amount: paymentData.transactionAmount,
    description: paymentData.description,
    payment_method_id: paymentData.paymentMethod,
    payer: {
      email: paymentData.payer.email,
      first_name: paymentData.payer.firstName,
      last_name: paymentData.payer.lastName,
      identification: {
        type: "CPF",
        number: paymentData.payer.cpf,
      },
    },
  };
  const { body } = await mercadoPago.payment.create(data);
  return {
    id: body.id,
    pix: {
      qrcode:
        "data:image/jpeg;base64," +
        body.point_of_interaction.transaction_data.qr_code_base64,
      qrcode_text: body.point_of_interaction.transaction_data.qr_code,
    },
  };
};

const getPayment = async (id) => {
  const { body } = await mercadoPago.payment.get(id);
  return body;
};

module.exports = {
  createPayment,
  getPayment,
};
