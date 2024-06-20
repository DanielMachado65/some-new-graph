"use strict";

const { Schema, model } = require("mongoose");

const MQueryRulesSchema = new Schema(
  {
    createAt: { type: Date, default: Date.now },
    queryComposition: {
      type: Schema.Types.ObjectId,
      ref: "MQueryComposer",
      default: null,
    },
    rules: {
      requiredKeys: {
        cpf: { type: Boolean, default: false },
        cnpj: { type: Boolean, default: false },
        placa: { type: Boolean, default: false },
        chassi: { type: Boolean, default: false },
        renavam: { type: Boolean, default: false },
        motor: { type: Boolean, default: false },
        uf: { type: Boolean, default: false },
        email: { type: Boolean, default: false },
        telefone: { type: Boolean, default: false },
        dataNascimento: { type: Boolean, default: false },
        sexo: { type: Boolean, default: false },
        endereco: {
          cep: { type: String, default: null },
          logradouro: { type: String, default: null },
          bairro: { type: String, default: null },
          cidade: { type: String, default: null },
          uf: { type: String, default: null },
          numeroDe: { type: String, default: null },
          numeroAte: { type: String, default: null },
          complemento: { type: String, default: null },
        },
      },
    },
  },
  {
    usePushEach: true,
  }
);

module.exports.MQueryRules = model("MQueryRules", MQueryRulesSchema);
