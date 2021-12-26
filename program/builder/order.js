class Order {
  constructor() {
    this.order_id = undefined;
    this.dishes = undefined;
    this.table_id = undefined;
    this.general_price = undefined;
    this.date = undefined;
  }
  getData() {
    return {
      order_id: this.order_id,
      dishes: this.dishes,
      table_id: this.table_id,
      general_price: this.general_price,
      date: this.date,
    };
  }
}

module.exports = Order;
