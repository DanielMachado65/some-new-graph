"use strict";

const renderInternalTemplateEmail = (
  name,
  email,
  phone,
  plate,
  chassi,
  renavam,
  brandAndModel,
  fipeCode
) => {
  return `
    <h1>Interesse em cotação de seguro ou financimento</h1>
    <hr>
    <p>NOME: ${name}</p>
    <p>E-MAIL: ${email}</p>
    <p>TELEFONE: ${phone}</p>
    <p>PLACA: ${plate}</p>
    <p>CHASSI: ${chassi}</p>
    <p>RENAVAM: ${renavam}</p>
    <p>MARCA/MODELO: ${brandAndModel}</p>
    <p>TABELA FIPE: ${fipeCode}</p
  `;
};

module.exports = {
  renderInternalTemplateEmail,
};
