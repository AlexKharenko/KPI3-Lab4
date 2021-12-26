const Database = require("../config/database");

class DishService {
  constructor(params) {
    this.params = params;
    this.db = new Database();
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
      for (let i = 0; i < 50000; i++) {
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
    try {
      const limit = 5000;
      if (this.params.page < 1) this.params.page = 1;
      const page = (this.params.page-1) * limit;
      const offset = page || 0;
      const res = await this.db.find({
        table_name: "dish",
        offset,
      }, limit);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async getDishDetails(id) {
    const res = await this.db.findOne({
      table_name: "dish",
      where: [{ column: "id", value: id }],
    });
    return res;
  }
}

module.exports = DishService;
