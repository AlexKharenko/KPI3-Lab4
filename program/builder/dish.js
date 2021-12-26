class Dish {
  constructor() {
    this.dish_id = undefined;
    this.dish_name = undefined;
    this.price = undefined;
    this.from = undefined;
    this.old_id = undefined;
  }
  getData() {
    return {
      dish_id: this.dish_id,
      dish_name: this.dish_name,
      price: this.price,
      from: this.from,
      old_id: this.old_id,
    };
  }
}

module.exports = Dish;
