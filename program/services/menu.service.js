const Database = require("../config/database");
const { Director, MenuBuilder } = require("../builder/index");
const DishService = require('./dish.service');
const {
  Chain,
  CheckMenuExistHandler,
  CreateMenuHandler,
  DeleteMenuHandler,
  UpdateMenuHandler,
} = require("../handlers");

class MenuService {
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
    return whereStatement;
  }
  async addDishes(array){
    const orders = []
    for (let item of array) {
      const dishService = new DishService();
      item.dishes = await dishService.getDishesByIdArray(item.dishes);
      const director = new Director();
      const builder = new MenuBuilder();
      director.makeMenu(builder, item);
      orders.push(builder.getResult());
    };
    return orders;
  }
  async getMenus() {
    const res = await this.db.find({
      table_name: "menu",
      where: this.generateWhereStatement(),
    });
    const menus = await this.addDishes(res);
    return menus;
  }
  async getMenuByID(id) {
    const res = await this.db.findOne({
      table_name: "menu",
      where: [{ column: "id", value: id }],
    });
    const director = new Director();
    const builder = new MenuBuilder();
    const dishService = new DishService();
    res.dishes = await dishService.getDishesByIdArray(res.dishes);
    director.makeMenu(builder, res);
    const order = builder.getResult();
    return order;
  }
  async updateMenu(menu) {
    const handlers = [new CheckMenuExistHandler(), new UpdateMenuHandler()];
    const chain = new Chain(handlers);
    chain.handle(menu);
  }
  async createMenu(menu) {
    console.log(menu);
    const handlers = [new CreateMenuHandler()];
    const chain = new Chain(handlers);
    chain.handle(menu);
  }
  async deleteMenu(menu) {
    const handlers = [new CheckMenuExistHandler(), new DeleteMenuHandler()];
    const chain = new Chain(handlers);
    chain.handle(menu);
  }
}

module.exports = MenuService;