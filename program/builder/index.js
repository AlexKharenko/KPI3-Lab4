const Booking = require("./booking");
const Order = require("./order");
const Table = require("./table");
const Dish = require("./dish");
const Menu = require("./menu");
const Product = require("./product");

class Director {
  makeBooking(builder, data) {
    builder.reset();
    builder.setId(data.id);
    builder.setPersonalData(data.personal_data);
    builder.setEmail(data.email);
    builder.setTableId(data.table_id);
    builder.setTableNumber(data.table_number);
    builder.setDateTime(data.date_time);
  }
  makeOrder(builder, data) {
    builder.reset();
    builder.setId(data.id);
    builder.setDishes(data.dishes);
    builder.setTableId(data.table_id);
    builder.setTableNumber(data.table_number);
    builder.setGeneralPrice(data.general_price);
    builder.setDate(data.date);
  }
  makeTable(builder, data) {
    builder.reset();
    builder.setId(data.id);
    builder.setTableNumber(data.table_number);
    builder.setStatusId(data.status_id);
    builder.setStatus(data.status);
  }
  makeDish(builder, data) {
    builder.reset();
    builder.setId(data.id);
    builder.setDishName(data.dish_name);
    builder.setPrice(data.price);
  }
  makeMenu(builder, data) {
    builder.reset();
    builder.setId(data.id);
    builder.setDishes(data.dishes);
    builder.setDate(data.date);
  }
  makeProduct(builder, data) {
    builder.reset();
    builder.setId(data.id);
    builder.setProductName(data.product_name);
    builder.setQuantity(data.quantity);
    builder.setQuantityNeeded(data.quantity_needed);
  }
}
class BuilderIntrface {
  constructor() {
    if (!this.reset || !this.getResult || !this.setId) {
      throw new Error("Class must have items!");
    }
  }
}
class BookingBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.booking = undefined;
  }
  reset() {
    this.booking = new Booking();
  }
  setId(id) {
    this.booking.booking_id = id;
  }
  setPersonalData(personal_data) {
    this.booking.personal_data = personal_data;
  }
  setEmail(email) {
    this.booking.email = email;
  }
  setTableId(table_id) {
    this.booking.table_id = table_id;
  }
  setTableNumber(table) {
    this.booking.table_number = table;
  }
  setDateTime(date_time) {
    this.booking.date_time = date_time;
  }
  getResult() {
    return this.booking.getData();
  }
}
class OrderBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.order = undefined;
  }
  reset() {
    this.order = new Order();
  }
  setId(id) {
    this.order.order_id = id;
  }
  setDishes(dishes) {
    this.order.dishes = dishes;
  }
  setTableId(table_id) {
    this.order.table_id = table_id;
  }
  setTableNumber(table) {
    this.order.table_number = table;
  }
  setGeneralPrice(general_price) {
    this.order.general_price = general_price;
  }
  setDate(date) {
    this.order.date = date;
  }
  getResult() {
    return this.order.getData();
  }
}
class TableBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.table = undefined;
  }
  reset() {
    this.table = new Table();
  }

  setId(id) {
    this.table.table_id = id;
  }
  setTableNumber(table) {
    this.table.table_number = table;
  }
  setStatusId(status_id) {
    this.table.status_id = status_id;
  }
  setStatus(status) {
    this.table.status = status;
  }
  getResult() {
    return this.table.getData();
  }
}
class DishBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.dish = undefined;
  }
  reset() {
    this.dish = new Dish();
  }
  setId(id) {
    this.dish.dish_id = id;
  }
  setDishId(dish_id) {
    this.dish.dish_id = dish_id;
  }
  setDishName(dish_name) {
    this.dish.dish_name = dish_name;
  }
  setPrice(price) {
    this.dish.price = price;
  }
  setOldId(old_id) {
    this.dish.old_id = old_id;
  }
  setFrom(from) {
    this.dish.from = from;
  }
  getResult() {
    return this.dish.getData();
  }
}
class MenuBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.menu = undefined;
  }
  reset() {
    this.menu = new Menu();
  }
  setId(id) {
    this.menu.menu_id = id;
  }
  setDishes(dishes) {
    this.menu.dishes = dishes;
  }
  setDate(date) {
    this.menu.date = date;
  }
  getResult() {
    return this.menu.getData();
  }
}
class ProductBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.product = undefined;
  }
  reset() {
    this.product = new Product();
  }
  setId(id) {
    this.product.product_id = id;
  }
  setProductName(product_name) {
    this.product.product_name = product_name;
  }
  setQuantity(quantity) {
    this.product.quantity = quantity;
  }
  setQuantityNeeded(quantity_needed) {
    this.product.quantity_needed = quantity_needed;
  }
  getResult() {
    return this.product.getData();
  }
}

module.exports = {
  Director,
  BookingBuilder,
  OrderBuilder,
  TableBuilder,
  DishBuilder,
  MenuBuilder,
  ProductBuilder,
};
