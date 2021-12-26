const Database = require("../config/database");
const { Director, ProductBuilder } = require("../builder/index");
const {
  Chain,
  CheckProductExistHandler,
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler,
} = require("../handlers");

class ProductService {
  constructor(params) {
    this.params = params;
    this.db = new Database();
  }
  generateWhereStatement() {
    const whereStatement = [];
    if (this.params.name) {
      whereStatement.push({
        column: "product_name",
        value: `%${this.params.name}%`,
        comparator: "ILIKE",
      });
    }
    if (this.params.needed) {
      whereStatement.push({
        column: "quantity_needed",
        value: 0,
        comparator: "=",
      });
    }
    if (this.params.maxQuantity) {
      whereStatement.push({
        column: "quantity",
        value: this.params.maxQuantity,
        comparator: "<=",
      });
    }
    return whereStatement;
  }
  async getProducts() {
    const res = await this.db.find({
      table_name: "product",
      where: this.generateWhereStatement(),
    });
    const products = [];
    res.forEach((item) => {
      const director = new Director();
      const builder = new ProductBuilder();
      director.makeProduct(builder, item);
      products.push(builder.getResult());
    });
    return products;
  }
  async getProductByID(id) {
    const res = await this.db.findOne({
      table_name: "product",
      where: [{ column: "id", value: id }],
    });
    const director = new Director();
    const builder = new ProductBuilder();
    director.makeProduct(builder, res);
    const product = builder.getResult();
    return product;
  }
  async updateProduct(product) {
    const handlers = [new CheckProductExistHandler(), new UpdateProductHandler()];
    const chain = new Chain(handlers);
    chain.handle(product);
  }
  async createProduct(product) {
    const handlers = [new CreateProductHandler()];
    const chain = new Chain(handlers);
    chain.handle(product);
  }
  async deleteProduct(product) {
    const handlers = [new CheckProductExistHandler(), new DeleteProductHandler()];
    const chain = new Chain(handlers);
    chain.handle(product);
  }
}

module.exports = ProductService;