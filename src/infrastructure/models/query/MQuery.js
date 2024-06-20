"use strict";

const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const MQuerySchema = new Schema(
  {
    createAt: { type: Date, default: Date.now },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "MUser",
      default: null,
    },
    version: { type: Number, default: 1 },
    documentQuery: { type: String, default: null },
    documentType: { type: String, default: null },
    executionTime: { type: Number, default: null },
    keys: {
      placa: { type: String, default: null },
      chassi: { type: String, default: null },
      motor: { type: String, default: null },
      renavam: { type: String, default: null },
      uf: { type: String, default: null },
      cpf: { type: String, default: null },
      cnpj: { type: String, default: null },
      telefone: { type: String, default: null },
      email: { type: String, default: null },
      nome: { type: String, default: null },
      nomeDaMae: { type: String, default: null },
      sexo: { type: String, default: null },
      dataNascimento: { type: String, default: null },
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
    refClass: { type: String, default: null },
    responseJSON: { type: Schema.Types.Mixed, default: null },
    stackResult: [
      {
        rawData: { type: Schema.Types.Mixed, default: null },
        serviceLog: {
          type: Schema.Types.ObjectId,
          ref: "MServiceLog",
          default: null,
        },
        serviceCode: { type: Number, default: 0 },
        dataFound: { type: Boolean, default: true },
        hasError: { type: Boolean, default: false },
        supplierCode: { type: Number, default: 0 },
        supplierName: { type: String, default: null },
        serviceName: { type: String, default: null },
      },
    ],
    failedServices: [
      {
        serviceLog: {
          type: Schema.Types.ObjectId,
          ref: "MServiceLog",
          default: null,
        },
        serviceCode: { type: Number, default: 0 },
        serviceName: { type: String, default: null },
        supplierCode: { type: Number, default: 0 },
        requeryTries: { type: Number, default: 2 },
        lastTry: { type: Date, default: null },
      },
    ],
    status: { type: Boolean, default: true },
    queryStatus: { type: String, default: null },
    code: { type: Number, default: 0 },
    log: { type: Schema.Types.ObjectId, ref: "MLog", default: null },
    reprocessedFrom: {
      type: Schema.Types.ObjectId,
      ref: "MQuery",
      default: null,
    },
  },
  {
    usePushEach: true,
  }
);

MQuerySchema.plugin(paginate);

module.exports.MQuerySchema = MQuerySchema;
module.exports.MQuery = mongoose.model("MQuery", MQuerySchema);
