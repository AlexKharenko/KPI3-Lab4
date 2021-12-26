class Product {
  constructor() {
    this.product_id = undefined;
    this.product_name = undefined;
    this.quantity = undefined;
    this.quantity_needed = undefined;
  }
  getData() {
    return {
      product_id: this.product_id,
      product_name: this.product_name,
      quantity: this.quantity,
      quantity_needed: this.quantity_needed,
    };
  }
}

module.exports = Product;
