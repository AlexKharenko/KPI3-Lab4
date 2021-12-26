const {
  CheckTableExistHandler,
  CreateTableHandler,
  DeleteTableHandler,
  UpdateTableHandler,
} = require("./table.handler");
const {
  CheckBookingExistHandler,
  CreateBookingHandler,
  DeleteBookingHandler,
  UpdateBookingHandler,
} = require("./booking.handler");
const {
  CheckStatusExistHandler,
  CreateStatusHandler,
  DeleteStatusHandler,
  UpdateStatusHandler,
} = require("./status.handler");
const {
  CheckOrderExistHandler,
  CreateOrderHandler,
  DeleteOrderHandler,
  CountSumHandler,
  UpdateOrderHandler,
} = require("./order.handler");
const {
  CheckMenuExistHandler,
  CreateMenuHandler,
  DeleteMenuHandler,
  UpdateMenuHandler,
} = require("./menu.handler");
const {
  CheckDishExistHandler,
  CreateDishHandler,
  DeleteDishHandler,
  UpdateDishHandler,
} = require("./dish.handler");
const {
  CheckProductExistHandler,
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler,
} = require("./product.handler");
class Chain {
  constructor(handlers) {
    this.createChain(handlers);
  }
  createChain(handlers) {
    for (let i = 0; i < handlers.length - 1; i++) {
      handlers[i].setNextHandler(handlers[i + 1]);
    }
    this.chain = handlers[0];
  }
  async handle(req) {
    return this.chain.handle(req);
  }
}

module.exports = {
  Chain,
  CheckTableExistHandler,
  CreateTableHandler,
  DeleteTableHandler,
  UpdateTableHandler,
  CheckBookingExistHandler,
  CreateBookingHandler,
  DeleteBookingHandler,
  UpdateBookingHandler,
  CheckStatusExistHandler,
  CreateStatusHandler,
  DeleteStatusHandler,
  UpdateStatusHandler,
  CheckOrderExistHandler,
  CreateOrderHandler,
  CountSumHandler,
  DeleteOrderHandler,
  UpdateOrderHandler,
  CheckMenuExistHandler,
  CreateMenuHandler,
  DeleteMenuHandler,
  UpdateMenuHandler,
  CheckDishExistHandler,
  CreateDishHandler,
  DeleteDishHandler,
  UpdateDishHandler,
  CheckProductExistHandler,
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler,
};
