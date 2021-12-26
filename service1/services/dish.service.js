const Database = require("../config/database");

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
        value: `%${this.params.name}%`,
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
  async getDishes() {
    const res = await this.db.find({
      table_name: "dish",
      where: this.generateWhereStatement(),
    });
    return res;
  }
}

module.exports = DishService;