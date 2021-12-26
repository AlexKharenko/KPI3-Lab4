const Database = require("../config/database");
const { Director, OrderBuilder } = require("../builder/index");
const DishService = require("./dish.service");
const {
  Chain,
  CheckOrderExistHandler,
  CreateOrderHandler,
  DeleteOrderHandler,
  UpdateOrderHandler,
  CountSumHandler,
} = require("../handlers");

class OrderService {
  constructor(params) {
    this.params = params;
    this.db = new Database();
  }
  generateWhereStatement() {
    const whereStatement = [];
    if (this.params.date) {
      whereStatement.push({
        column: "date",
        value: `'${this.params.date} 00:00:00' AND '${this.params.date} 23:59:59'`,
        comparator: "BETWEEN",
      });
    }
    if (this.params.table) {
      whereStatement.push({
        column: "table_id",
        value: this.params.table,
        comparator: "=",
      });
    }
    return whereStatement;
  }
  async addDishes(array) {
    const orders = [];
    for (let item of array) {
      const dishService = new DishService();
      item.dishes = await dishService.getDishesByIdArray(item.dishes);
      const director = new Director();
      const builder = new OrderBuilder();
      director.makeOrder(builder, item);
      orders.push(builder.getResult());
    }
    return orders;
  }
  async getOrders() {
    const res = await this.db.find({
      table_name: "orders",
      where: this.generateWhereStatement(),
    });
    const orders = await this.addDishes(res);
    return orders;
  }
  async getOrderByID(id) {
    const res = await this.db.findOne({
      table_name: "orders",
      where: [{ column: "id", value: id }],
    });
    const director = new Director();
    const builder = new OrderBuilder();
    const dishService = new DishService();
    res.dishes = await dishService.getDishesByIdArray(res.dishes);
    director.makeOrder(builder, res);
    const order = builder.getResult();
    return order;
  }
  async updateOrder(order) {
    const handlers = [new CheckOrderExistHandler(), new UpdateOrderHandler()];
    const chain = new Chain(handlers);
    chain.handle(order);
  }
  async createOrder(order) {
    const handlers = [new CountSumHandler(), new CreateOrderHandler()];
    const chain = new Chain(handlers);
    chain.handle(order);
  }
  async deleteOrder(order) {
    const handlers = [new CheckOrderExistHandler(), new DeleteOrderHandler()];
    const chain = new Chain(handlers);
    chain.handle(order);
  }
}

module.exports = OrderService;
