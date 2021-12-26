const Database = require("../config/database");
const { Director, BookingBuilder } = require("../builder/index");
const {
  Chain,
  CheckBookingExistHandler,
  CreateBookingHandler,
  DeleteBookingHandler,
  UpdateBookingHandler,
} = require("../handlers");

class BookingService {
  constructor(params) {
    this.params = params;
    this.db = new Database();
  }
  generateWhereStatement() {
    const whereStatement = [];
    if (this.params.date) {
      whereStatement.push({
        column: "date_time",
        value: `'${this.params.date} 00:00:00' AND '${this.params.date} 23:59:59'`,
        comparator: "BETWEEN",
      });
    }
    return whereStatement;
  }
  async getBookings() {
    const res = await this.db.find({
      table_name: "booking",
      where: this.generateWhereStatement(),
    });
    const bookings = [];
    res.forEach((item) => {
      const director = new Director();
      const builder = new BookingBuilder();
      director.makeBooking(builder, item);
      bookings.push(builder.getResult());
    });
    return bookings;
  }
  async getBookingByID(id) {
    const res = await this.db.findOne({
      table_name: "booking",
      where: [{ column: "id", value: id }],
    });
    const director = new Director();
    const builder = new BookingBuilder();
    director.makeBooking(builder, res);
    const booking = builder.getResult();
    return booking;
  }
  async getBookingByPersonalData(personal_data) {
    const res = await this.db.findOne({
      table_name: "booking",
      where: [{ column: "parsonal_data", value: personal_data }],
    });
    const director = new Director();
    const builder = new BookingBuilder();
    director.makeBooking(builder, res);
    const booking = builder.getResult();
    return booking;
  }
  async updateBooking(booking) {
    const handlers = [new CheckBookingExistHandler(), new UpdateBookingHandler()];
    const chain = new Chain(handlers);
    chain.handle(booking);
  }
  async createBooking(booking) {
    const handlers = [new CreateBookingHandler()];
    const chain = new Chain(handlers);
    chain.handle(booking);
  }
  async deleteBooking(booking) {
    const handlers = [new CheckBookingExistHandler(), new DeleteBookingHandler()];
    const chain = new Chain(handlers);
    chain.handle(booking);
  }
}

module.exports = BookingService;
