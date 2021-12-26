class Table {
  constructor() {
    this.table_id = undefined;
    this.table_number = undefined;
    this.status_id = undefined;
  }
  getData() {
    return {
      table_id: this.table_id,
      table_number: this.table_number,
      status_id: this.status_id,
    };
  }
}

module.exports = Table;
