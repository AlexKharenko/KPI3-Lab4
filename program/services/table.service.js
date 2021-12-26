const Database = require("../config/database");
const { Director, TableBuilder } = require("../builder/index");
const {
  Chain,
  CheckTableExistHandler,
  CreateTableHandler,
  DeleteTableHandler,
  UpdateTableHandler,
} = require("../handlers");

class TableService {
  constructor(params) {
    this.params = params;
    this.db = new Database();
  }
  generateWhereStatement() {
    const whereStatement = [];
    if (this.params.status) {
      whereStatement.push({
        column: "status_id",
        value: this.params.status,
      });
    }
    return whereStatement;
  }
  filterTables(tables, booking) {
    booking.forEach(({ table_id }) => {
      tables.forEach(({ id }, index) => {
        if (table_id === id) {
          tables.splice(index, 1);
        }
      });
    });
    return tables;
  }
  async getFreeTablesForTime() {
    const bookingQuery = `SELECT table_id FROM "booking" WHERE "date_time" BETWEEN TIMESTAMP '${this.params.time}' - interval '1 hour' AND TIMESTAMP '${this.params.time}' + interval '1 hour'`;
    const tablesQuery = 'SELECT * FROM "res_table"';
    let bookingRows = await this.db.useQuery(bookingQuery);
    bookingRows = bookingRows.rows;
    let tablesRows = await this.db.useQuery(tablesQuery);
    tablesRows = tablesRows.rows;
    const res = this.filterTables(tablesRows, bookingRows);
    const tables = [];
    res.forEach((item) => {
      const director = new Director();
      const builder = new TableBuilder();
      director.makeTable(builder, item);
      tables.push(builder.getResult());
    });
    return tables;
  }
  async getTables() {
    const res = await this.db.find({
      table_name: "res_table",
      where: this.generateWhereStatement(),
    });
    const tables = [];
    res.forEach((item) => {
      const director = new Director();
      const builder = new TableBuilder();
      director.makeTable(builder, item);
      tables.push(builder.getResult());
    });
    return tables;
  }
  async getTableByID(id) {
    const res = await this.db.findOne({
      table_name: "res_table",
      where: [{ column: "id", value: id }],
    });
    const director = new Director();
    const builder = new TableBuilder();
    director.makeTable(builder, res);
    const booking = builder.getResult();
    return booking;
  }
  async getTableByNumber(table_number) {
    const res = await this.db.findOne({
      table_name: "res_table",
      where: [{ column: "table_number", value: table_number }],
    });
    const director = new Director();
    const builder = new TableBuilder();
    director.makeTable(builder, res);
    const booking = builder.getResult();
    return booking;
  }
  async updateTable(table) {
    const handlers = [new CheckTableExistHandler(), new UpdateTableHandler()];
    const chain = new Chain(handlers);
    chain.handle(table);
  }
  async createTable(table) {
    const handlers = [new CreateTableHandler()];
    const chain = new Chain(handlers);
    chain.handle(table);
  }
  async deleteTable(table) {
    const handlers = [new CheckTableExistHandler(), new DeleteTableHandler()];
    const chain = new Chain(handlers);
    chain.handle(table);
  }
}

module.exports = TableService;
