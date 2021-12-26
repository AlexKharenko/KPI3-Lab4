const Handler = require("./handle");
const Database = require("../config/database");

class CheckTableExistHandler extends Handler {
  db = Database.getInstance();
  async handle(table) {
    const checkTable = await this.db.findOne({
      table_name: "res_table",
      where: [{ column: "id", value: table.table_id }],
    });
    if (!checkTable) {
      throw new Error("Not Found");
    }
    super.handle(table);
  }
}

class UpdateTableHandler extends Handler {
  db = Database.getInstance();
  async handle(table) {
    const { table_id, ...table_use } = table;
    await this.db.update({
      table_name: "res_table",
      columns: Object.keys(table_use),
      values: Object.values(table_use),
      where: [{ column: "id", value: table.table_id }],
    });
    super.handle(table);
  }
}

class CreateTableHandler extends Handler {
  db = Database.getInstance();
  async handle(table) {
    await this.db.create({
      table_name: "res_table",
      columns: Object.keys(table),
      values: Object.values(table),
    });
    super.handle(table);
  }
}

class DeleteTableHandler extends Handler {
  db = Database.getInstance();
  async handle({ table_id }) {
    await this.db.delete({
      table_name: "res_table",
      where: [{ column: "id", value: table_id }],
    });
    super.handle({ table_id });
  }
}

module.exports = {
  CheckTableExistHandler,
  CreateTableHandler,
  DeleteTableHandler,
  UpdateTableHandler,
};
