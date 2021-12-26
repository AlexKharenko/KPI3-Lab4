const Handler = require("./handle");
const Database = require("../config/database");

class CheckOrderExistHandler extends Handler {
  db = Database.getInstance();
  async handle(order) {
    const checkOrder = await this.db.findOne({
      table_name: "orders",
      where: [{ column: "id", value: order.order_id }],
    });
    if (!checkOrder) {
      throw new Error("Not Found");
    }
    super.handle(order);
  }
}

class UpdateOrderHandler extends Handler {
  db = Database.getInstance();
  async handle(order) {
    const { order_id, ...order_use } = order;
    await this.db.update({
      table_name: "orders",
      columns: Object.keys(order_use),
      values: Object.values(order_use),
      where: [{ column: "id", value: order.order_id }],
    });
    super.handle(order);
  }
}

class CreateOrderHandler extends Handler {
  db = Database.getInstance();
  async handle(order) {
    try {
      await this.db.create({
        table_name: "orders",
        columns: Object.keys(order),
        values: Object.values(order),
      });
    } catch (err) {
      console.log(err);
    }
    super.handle(order);
  }
}

class CountSumHandler extends Handler {
  db = Database.getInstance();
  async handle(order) {
    try {
      const { rows } = await this.db.useQuery(
        `Select SUM(price) from dish where id = Any(Array [${order.dishes
          .map((dish) => dish)
          .join(", ")}]) `
      );
      order.general_price = rows[0].sum || 0;
    } catch (err) {
      console.log(err);
    }
    super.handle(order);
  }
}

class DeleteOrderHandler extends Handler {
  db = Database.getInstance();
  async handle({ order_id }) {
    await this.db.delete({
      table_name: "orders",
      where: [{ column: "id", value: order_id }],
    });
    super.handle({ order_id });
  }
}

module.exports = {
  CheckOrderExistHandler,
  CreateOrderHandler,
  CountSumHandler,
  DeleteOrderHandler,
  UpdateOrderHandler,
};
