"use strict";

const util = require("../utils/utils");

module.exports = (code) => {
  code = typeof code === "string" ? util.tryParseInt(code) : code;
  switch (code) {
    case 1:
      return "Hexagon";
    case 10:
      return "Consulta Auto";
    case 20:
      return "Credauto";
    case 30:
      return "Checktudo";
    case 40:
      return "Consulteflex";
    case 50:
      return "GrupoTDI";
    case 51:
      return "GrupoTDI";
    case 60:
      return "Sinaliza";
    case 70:
      return "Checkpro";
    case 80:
      return "Correctdata";
    case 90:
      return "Absoluta";
    case 100:
      return "Assertiva";
    case 110:
      return "Credify";
    case 120:
      return "Ares";
    case 130:
      return "Serpro";
    case 140:
      return "Cebraco";
    case 150:
      return "KSI";
    case 160:
      return "Inova Mind";
    case 170:
      return "Data Stone";
    case 180:
      return "Autocorp";
    case 190:
      return "Webmotors";
    case 200:
      return "Instituto de Protesto - IEPTB";
    case 230:
      return "Grupo VEC";
    case 240:
      return "Sophus";
    case 250:
      return "InfoCar";
    case 260:
      return "SAVECRED";
    case 270:
      return "Consulcar";
    case 280:
      return "SUIV";
    case 290:
      return "SAVECRED";
    case 300:
      return "Google";
    case 310:
      return "Zapay";
    case 320:
      return "Pier";
    case 330:
      return "Alfatest";
    case 350:
      return "MTix";
    case 360:
      return "Infosimples";
    case 380:
      return "Future Data";
    case 390:
      return "SUV";
    default:
      return null;
  }
};
