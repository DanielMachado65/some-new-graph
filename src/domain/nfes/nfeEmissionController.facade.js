'use strict';
const { NFeEmissionControllerRepository } = require('./components/nfeEmissionController.repository');
const nfeEmissionControlRepository = new NFeEmissionControllerRepository();

async function checkHaveMonthLimitForGenerate(month, year, nfeValue){
    const monthControlData =  await nfeEmissionControlRepository.getMonthControllerInformation(month, year);
    const generatedValueOnThisMonth =  parseFloat(monthControlData.generatedValue);
    const limitValueOfThisMonth =  parseFloat(monthControlData.limitValue);
    const nfeValueTryingToGenerate = parseFloat(nfeValue);
    return limitValueOfThisMonth - (generatedValueOnThisMonth + nfeValueTryingToGenerate) > 0;
}

async function insertNfeValueOnGenerated(month, year, nfeValue){
    return await nfeEmissionControlRepository.incrementGeneratedValue(month, year, nfeValue);
}

async function removeRefusedNfeValueFromGenerated(month, year, nfeValue){
    return await nfeEmissionControlRepository.removeFromGenerated(month, year, nfeValue);
}

module.exports = { checkHaveMonthLimitForGenerate, insertNfeValueOnGenerated, removeRefusedNfeValueFromGenerated };
