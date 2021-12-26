const { Pool } = require("pg");

const { DB_HOST, DB_NAME, DB_USER, DB_PORT, DB_PASSWORD } = process.env;

const localPoolConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : localPoolConfig;

const pool = new Pool(poolConfig);

class Database {
  constructor() {
    this.pool = pool;
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  async create({ table_name, columns, values }) {
    const request =
      `INSERT INTO ${table_name}` +
      "(" +
      columns.map((key) => `"${key}"`).join(", ") +
      ")" +
      "VALUES(" +
      values
        .map((key) => {
          if (typeof key === "number") {
            return key;
          }
          if (typeof key === "object") {
            return "{" + key.map((obj) => `${obj}`).join(", ") + "}";
          }
          if (typeof key === "string") {
            return `'${key}'`;
          }
        })
        .join(", ") +
      ");";
    try {
      return await this.pool.query(request);
    } catch (error) {
      return error;
    }
  }
  async createMany({ table_name, columns, values }) {
    const request =
      `INSERT INTO ${table_name}` +
      "(" +
      columns.map((key) => `"${key}"`).join(", ") +
      ")" +
      "VALUES"+ values.map(item=>"(" +
      item
        .map((key) => {
          if (typeof key === "number") {
            return key;
          }
          if (typeof key === "string") {
            return `'${key}'`;
          }
        })
        .join(", ") +
      ")").join(", ")+";";
    try {
      return await this.pool.query(request);
    } catch (error) {
      return error;
    }
  }
  async update({ table_name, columns, values, where }) {
    let counter = 1;
    const sets = columns.map((key) => `"${key}"=($${counter++})`).join(", ");
    const val = values.map((key) => {
      if (typeof key === "number") {
        return key;
      }
      if (typeof key === "object") {
        return "{" + key.map((obj) => `${obj}`).join(", ") + "}";
      }
      if (typeof key === "string") {
        return `"${key}"`;
      }
    });
    const whereStatements =
      where
        .map(
          ({ column, comparator }) =>
            `"${column}" ${comparator || "="} ($${counter++})`
        )
        .join(" AND ") + " ";
    const request = `UPDATE ${table_name} SET ${sets} WHERE (${whereStatements})`;
    try {
      console.log(request, [...val, ...where.map((obj) => obj.value)]);
      return await this.pool.query(request, [
        ...val,
        ...where.map((obj) => obj.value),
      ]);
    } catch (error) {
      return error;
    }
  }
  async delete({ table_name, where }) {
    let counter = 1;
    const whereStatements =
      where
        .map(
          ({ column, comparator }) =>
            `"${column}" ${comparator || "="} $${counter++}`
        )
        .join(" AND ") + " ";
    const request = `DELETE FROM ${table_name} WHERE ${whereStatements}`;
    try {
      return await this.pool.query(
        request,
        where.map((obj) => obj.value)
      );
    } catch (error) {
      return error;
    }
  }
  async find({ table_name, query, where, order_by, offset }, limit) {
    let counter = 1;
    const whereStatements =
      (where
        ? "WHERE " +
          where
            .map(
              ({ column, comparator, value }) =>
                `"${column}" ${comparator || "="} ${value}`
            )
            .join(" AND ")
        : "") + "";
    const orderByStatement = order_by
      ? `ORDER BY ${order_by.map(() => counter++)} `
      : " ";
    const request =
      "SELECT " +
      (query ? query.map((column) => `"${column}"`).join(",") : "*") +
      ` FROM "${table_name}" ` +
      whereStatements +
      orderByStatement + (offset ? `OFFSET ${offset} ROWS ` : '') +
      (limit ? `LIMIT ${limit} ` : "");
    const values = [
      ...(order_by ?? []),
    ];
    try {
      const res = await this.pool.query(request, values);
      return res.rows;
    } catch (error) {
      return error;
    }
  }
  async findOne(params){
    const res = await this.find(params, 1);
    return res[0];
  }
  async useQuery(request, values=[]){
    return await this.pool.query(request, values);
  }
}

module.exports = Database;
