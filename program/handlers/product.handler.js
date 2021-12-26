const Handler = require("./handle");
const Database = require("../config/database");

class CheckProductExistHandler extends Handler {
  db = Database.getInstance();
  async handle(product) {
    const checkProduct = await this.db.findOne({
      table_name: "product",
      where: [{ column: "id", value: product.product_id }],
    });
    if (!checkProduct) {
      throw new Error("Not Found");
    }
    super.handle(product);
  }
}

class UpdateProductHandler extends Handler {
  db = Database.getInstance();
  async handle(product) {
    const { product_id, ...product_use } = product;
    await this.db.update({
      table_name: "product",
      columns: Object.keys(product_use),
      values: Object.values(product_use),
      where: [{ column: "id", value: product.product_id }],
    });
    super.handle(product);
  }
}

class CreateProductHandler extends Handler {
  db = Database.getInstance();
  async handle(product) {
    await this.db.create({
      table_name: "product",
      columns: Object.keys(product),
      values: Object.values(product),
    });
    super.handle(product);
  }
}

class DeleteProductHandler extends Handler {
  db = Database.getInstance();
  async handle({ product_id }) {
    await this.db.delete({
      table_name: "product",
      where: [{ column: "id", value: product_id }],
    });
    super.handle({ product_id });
  }
}

module.exports = {
  CheckProductExistHandler,
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler,
};
