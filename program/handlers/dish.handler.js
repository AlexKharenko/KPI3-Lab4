const Handler = require("./handle");
const Database = require("../config/database");

class CheckDishExistHandler extends Handler {
  db = Database.getInstance();
  async handle(dish) {
    const checkDish = await this.db.findOne({
      table_name: "dish",
      where: [{ column: "id", value: dish.dish_id }],
    });
    if (!checkDish) {
      throw new Error("Not Found");
    }
    super.handle(dish);
  }
}

class UpdateDishHandler extends Handler {
  db = Database.getInstance();
  async handle(dish) {
    const { dish_id, ...dish_use } = dish;
    await this.db.update({
      table_name: "dish",
      columns: Object.keys(dish_use),
      values: Object.values(dish_use),
      where: [{ column: "id", value: dish.dish_id }],
    });
    super.handle(dish);
  }
}

class CreateDishHandler extends Handler {
  db = Database.getInstance();
  async handle(dish) {
    await this.db.create({
      table_name: "dish",
      columns: Object.keys(dish),
      values: Object.values(dish),
    });
    super.handle(dish);
  }
}

class DeleteDishHandler extends Handler {
  db = Database.getInstance();
  async handle({ dish_id }) {
    await this.db.delete({
      table_name: "dish",
      where: [{ column: "id", value: dish_id }],
    });
    super.handle({ dish_id });
  }
}

module.exports = {
  CheckDishExistHandler,
  CreateDishHandler,
  DeleteDishHandler,
  UpdateDishHandler,
};
