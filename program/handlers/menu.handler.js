const Handler = require("./handle");
const Database = require("../config/database");

class CheckMenuExistHandler extends Handler {
  db = Database.getInstance();
  async handle(menu) {
    const checkMenu = await this.db.findOne({
      table_name: "menu",
      where: [{ column: "id", value: menu.menu_id }],
    });
    if (!checkMenu) {
      throw new Error("Not Found");
    }
    super.handle(menu);
  }
}

class UpdateMenuHandler extends Handler {
  db = Database.getInstance();
  async handle(menu) {
    const { menu_id, ...menu_use } = menu;
    await this.db.update({
      table_name: "menu",
      columns: Object.keys(menu_use),
      values: Object.values(menu_use),
      where: [{ column: "id", value: menu.menu_id }],
    });
    super.handle(menu);
  }
}

class CreateMenuHandler extends Handler {
  db = Database.getInstance();
  async handle(menu) {
    await this.db.create({
      table_name: "menu",
      columns: Object.keys(menu),
      values: Object.values(menu),
    });
    super.handle(menu);
  }
}

class DeleteMenuHandler extends Handler {
  db = Database.getInstance();
  async handle({ menu_id }) {
    await this.db.delete({
      table_name: "menu",
      where: [{ column: "id", value: menu_id }],
    });
    super.handle({ menu_id });
  }
}

module.exports = {
  CheckMenuExistHandler,
  CreateMenuHandler,
  DeleteMenuHandler,
  UpdateMenuHandler,
};
