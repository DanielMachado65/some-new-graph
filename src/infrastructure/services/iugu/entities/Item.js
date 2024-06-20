"use strict";

module.exports.Item = class Item {
  description;
  quantity;
  price_cents;

  constructor(description, quantity, priceCents) {
    this.description = description;
    this.quantity = quantity;
    this.price_cents = priceCents;
  }

  setDescription(value) {
    this.description = value;
    return this;
  }

  setQuantity(value) {
    this.quantity = value;
    return this;
  }

  setPriceCents(value) {
    this.price_cents = value;
    return this;
  }

  toObject() {
    return {
      description: this.description,
      quantity: this.quantity,
      price_cents: this.quantity,
    };
  }

  static ValidateItem = function (item) {
    if (!(item instanceof Item))
      throw new Error("Invalid item, must be a Item type");
  };

  static ValidateItems = function (items) {
    if (Array.isArray(items)) {
      // items.forEach((item) => Item.ValidateItem(item));
    } else throw new Error("Invalid type to items. Must be an array of Items");
  };
};
