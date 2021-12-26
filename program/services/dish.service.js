const Database = require("../config/database");
const { Director, DishBuilder } = require("../builder/index");
const {
  Chain,
  CheckDishExistHandler,
  CreateDishHandler,
  DeleteDishHandler,
  UpdateDishHandler,
} = require("../handlers");

class DishService {
  constructor(params) {
    this.params = params;
    this.db = new Database();
  }
  generateWhereStatement() {
    const whereStatement = [];
    if (this.params.name) {
      whereStatement.push({
        column: "dish_name",
        value: `'%${this.params.name}%'`,
        comparator: "ILIKE",
      });
    }
    if (this.params.maxPrice) {
      whereStatement.push({
        column: "price",
        value: this.params.maxPrice,
        comparator: "<=",
      });
    }
    if (this.params.minPrice) {
      whereStatement.push({
        column: "price",
        value: this.params.minPrice,
        comparator: ">=",
      });
    }
    return whereStatement;
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  makeString(length) {
    var result = "";
    var characters = "abcdefghijklmno";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async addDishes() {
    try {
      const dishes = [];
      for (let i = 0; i < 100000; i++) {
        await dishes.push([
          this.getRandomArbitrary(5, 100),
          this.makeString(4),
        ]);
      }
      const res = await this.db.createMany({
        table_name: "dish",
        columns: ["price", "dish_name"],
        values: dishes,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async getDishes() {
    const res = await this.db.find({
      table_name: "dish",
      where: this.generateWhereStatement(),
    });
    const cache = await this.db.find({
      table_name: "cache_dish",
      where: this.generateWhereStatement(),
    });
    const dishes = [];
    res.forEach((item) => {
      const director = new Director();
      const builder = new DishBuilder();
      director.makeDish(builder, item);
      builder.setFrom("main");
      dishes.push(builder.getResult());
    });
    cache.forEach((item) => {
      const director = new Director();
      const builder = new DishBuilder();
      director.makeDish(builder, item);
      builder.setOldId(item.old_id);
      builder.setFrom(item.from);
      dishes.push(builder.getResult());
    });
    return dishes;
  }
  async getDishesByIdArray(ids) {
    const whereStatement = [];
    whereStatement.push({
      column: "id",
      value: `ANY(ARRAY[${ids}])`,
      comparator: "=",
    });
    const res = await this.db.find({
      table_name: "dish",
      where: whereStatement,
    });
    const dishes = [];
    res.forEach((item) => {
      const director = new Director();
      const builder = new DishBuilder();
      director.makeDish(builder, item);
      builder.setFrom(item.from || "main");
      dishes.push(builder.getResult());
    });
    return dishes;
  }
  async getDishByID(id, service = false) {
    let res = {};
    if (service) {
      res = await this.db.findOne({
        table_name: "cache_dish",
        where: [{ column: "id", value: id }],
      });
    } else {
      res = await this.db.findOne({
        table_name: "dish",
        where: [{ column: "id", value: id }],
      });
    }
    const director = new Director();
    const builder = new DishBuilder();
    director.makeDish(builder, res);
    builder.setFrom(res.from || "main");
    builder.setOldId(res.old_id || null);
    const order = builder.getResult();
    return order;
  }
  async updateDish(dish) {
    const handlers = [new CheckDishExistHandler(), new UpdateDishHandler()];
    const chain = new Chain(handlers);
    chain.handle(dish);
  }
  async createDish(dish) {
    const handlers = [new CreateDishHandler()];
    const chain = new Chain(handlers);
    chain.handle(dish);
  }
  async deleteDish(dish) {
    const handlers = [new CheckDishExistHandler(), new DeleteDishHandler()];
    const chain = new Chain(handlers);
    chain.handle(dish);
  }
}

module.exports = DishService;
