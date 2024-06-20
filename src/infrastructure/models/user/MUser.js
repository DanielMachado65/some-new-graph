"use strict";

const { Schema, model } = require("mongoose");
const encryptor = require("../../utils/cryptor");
const paginate = require("mongoose-paginate-v2");

const MUserSchema = new Schema(
  {
    siteAdm: { type: Boolean, default: false },
    accessCode: { type: String, default: null, lowercase: true },
    email: { type: String, lowercase: true },
    cpf: { type: String, default: null },
    pass: { type: String, default: null },
    name: { type: String, default: null },
    billing: {
      type: Schema.Types.ObjectId,
      ref: "MBilling",
      default: null,
    },
    type: { type: Number, default: 1 },
    lastLogin: { type: Date, default: Date.now },
    createAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    picture: { type: String, default: null },
    deletedAt: { type: Date, default: null },
    whenDeleteAt: { type: Date, default: null },
    creationOrigin: {
      type: String,
      default: "unknown",
      enum: ["admin", "website", "android-app", "ios-app", "unknown"],
    },
    facebook: {
      id: { type: String, default: null },
      token: { type: String, default: null },
      name: { type: String, default: null },
      email: { type: String, default: null },
    },
    google: {
      id: { type: String, default: null },
      token: { type: String, default: null },
      name: { type: String, default: null },
      email: { type: String, default: null },
    },
    security: {
      whitelist: [{ type: String, default: [] }],
      blacklist: [{ type: String, default: [] }],
    },
    generalData: {
      billingOwner: {
        name: { type: String, default: null },
        phoneNumber: { type: String, default: null },
        email: { type: String, default: null },
      },
      address: {
        zipcode: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        neighborhood: { type: String, default: null },
        street: { type: String, default: null },
        complement: { type: String, default: null },
        number: { type: String, default: null },
      },
      phoneNumber1: { type: String, default: null },
      phoneNumber2: { type: String, default: null },
      birthDate: { type: Date, default: null },
    },
    company: {
      cnpj: { type: String, default: null },
      socialName: { type: String, default: null },
      fantasyName: { type: String, default: null },
      codigoCnae: { type: String, default: null },
      stateSubscription: { type: String, default: null },
      simplesNacional: { type: Boolean, default: false },
      codigoNaturezaJuridica: { type: String, default: null },
    },
    hierarchy: {
      owner: { type: Schema.Types.ObjectId, ref: "MUser", default: null }, //cobrança mãe
      partner: {
        type: Schema.Types.ObjectId,
        ref: "MUser",
        default: null,
      }, // usuário é filho de um parceiro
      indicator: {
        type: Schema.Types.ObjectId,
        ref: "MUser",
        default: null,
      },
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: "MPartner",
      default: null,
    }, // usuario é um parceiro
    permissions: {
      type: Schema.Types.ObjectId,
      ref: "MPermissions",
      default: null,
    }, //permissões do usuario
    documents: [
      {
        name: { type: String, default: null },
        link: { type: String, default: null },
      },
    ],
    conditions: {
      term: { type: Schema.Types.ObjectId, ref: "MTerm", default: null },
      agree: { type: Boolean, default: false },
      date: { type: Date, default: null },
    },
    cancellationQuiz: {
      reason: { type: String, default: null },
      anotherReason: { type: String, default: null },
      message: { type: String, default: null },
      createAt: { type: Date, default: Date.now },
      debtorClient: { type: Boolean, default: false },
    },
    afterSales: {
      infos: [
        {
          operator: {
            type: Schema.Types.ObjectId,
            ref: "MUser",
            default: null,
          },
          message: { type: String, default: null },
          date: { type: Date, default: null },
        },
      ],
    },
    externalControls: {
      arc: {
        /** @deprecated */
        id: { type: String, default: null },
        tenants: [
          {
            id: { type: String, default: null },
            cnpj: { type: String, default: null },
          }
        ],
      },
      asaas: {
        id: { type: String, default: null },
      },
      iugu: {
        id: { type: String, default: null },
      },
    },
  },
  {
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.pass;
      },
    },
    usePushEach: true,
  }
);

MUserSchema.pre("save", function (done) {
  if (!this.isModified("pass")) {
    return done();
  }
  this.pass = encryptor.encrypt(this.pass);
  done();
});

MUserSchema.plugin(paginate);

model("MUser", MUserSchema);
