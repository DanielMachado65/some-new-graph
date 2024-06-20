"use strict";
// @ts-check

/**
 * Transforma o preço de decimal em centavos
 * Exemplo:
 *    R$3,00 == 300c
 *    R$42,90 == 4290c
 * @param { number } price
 * @returns { number } price in cents
 */
const toCents = (price) => {
  return Math.trunc(price * 100);
};

/**
 * Transforma o preço de centavos em decimal
 * Exemplo:
 *    300c == R$3,00
 *    4290c == R$42,90
 * @param { number } price
 * @returns { number } price in decimals
 */
const fromCents = (price) => {
  return parseFloat((price / 100).toFixed(2));
};

module.exports = {
  fromCents,
  toCents,
};
