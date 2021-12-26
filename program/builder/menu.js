class Menu {
  constructor() {
    this.menu_id = undefined;
    this.dishes = undefined;
    this.date = undefined;
  }
  getData() {
    return {
      menu_id: this.menu_id,
      dishes: this.dishes,
      date: this.date,
    };
  }
}

module.exports = Menu;
