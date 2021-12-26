const Handler = require("./handle");
const Database = require("../config/database");

class CheckStatusExistHandler extends Handler {
  db = Database.getInstance();
  async handle(status) {
    const checkStatus = await this.db.findOne({
      table_name: "table_status",
      where: [{ column: "id", value: status.status_id }],
    });
    if (!checkStatus) {
      throw new Error("Not Found");
    }
    super.handle(status);
  }
}

class UpdateStatusHandler extends Handler {
  db = Database.getInstance();
  async handle(status) {
    await this.db.update({
      table_name: "table_status",
      columns: Object.keys(status),
      values: Object.values(status),
      where: [{ column: "id", value: status.status_id }],
    });
    super.handle(status);
  }
}

class CreateStatusHandler extends Handler {
  db = Database.getInstance();
  async handle(status) {
    const { status_id, ...status_use } = status;
    await this.db.create({
      table_name: "table_status",
      columns: Object.keys(status_use),
      values: Object.values(status_use),
    });
    super.handle(status);
  }
}

class DeleteStatusHandler extends Handler {
  db = Database.getInstance();
  async handle({ status_id }) {
    await this.db.delete({
      table_name: "table_status",
      where: [{ column: "id", value: status_id }],
    });
    super.handle({ status_id });
  }
}

module.exports = {
  CheckStatusExistHandler,
  CreateStatusHandler,
  DeleteStatusHandler,
  UpdateStatusHandler,
};
