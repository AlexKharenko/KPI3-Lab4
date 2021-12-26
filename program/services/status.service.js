const Database = require("../config/database");
const {
  Chain,
  CheckStatusExistHandler,
  CreateStatusHandler,
  DeleteStatusHandler,
  UpdateStatusHandler,
} = require("../handlers");

class StatusService {
  constructor() {
    this.db = new Database();
  }
  async getStatuses() {
    const res = await this.db.find({
      table_name: "table_status"
    });
    return res;
  }
  async getStatusByID(id) {
    const res = await this.db.findOne({
      table_name: "table_status",
      where: [{ column: "id", value: id }],
    });
    return res;
  }
  async updateStatus(status) {
    const handlers = [new CheckStatusExistHandler(), new UpdateStatusHandler()];
    const chain = new Chain(handlers);
    chain.handle(status);
  }
  async createStatus(status) {
    const handlers = [new CreateStatusHandler()];
    const chain = new Chain(handlers);
    chain.handle(status);
  }
  async deleteStatus(status) {
    const handlers = [new CheckStatusExistHandler(), new DeleteStatusHandler()];
    const chain = new Chain(handlers);
    chain.handle(status);
  }
}

module.exports = StatusService;