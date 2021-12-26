const Handler = require("./handle");
const Database = require("../config/database");

class CheckBookingExistHandler extends Handler {
  db = Database.getInstance();
  async handle(booking) {
    const checkBooking = await this.db.findOne({
      table_name: "booking",
      where: [{ column: "id", value: booking.booking_id }],
    });
    if (!checkBooking) {
      throw new Error("Not Found");
    }
    super.handle(booking);
  }
}

class UpdateBookingHandler extends Handler {
  db = Database.getInstance();
  async handle(booking) {
    const { booking_id, ...booking_use } = booking;
    await this.db.update({
      table_name: "booking",
      columns: Object.keys(booking_use),
      values: Object.values(booking_use),
      where: [{ column: "id", value: booking.booking_id }],
    });
    super.handle(booking);
  }
}

class CreateBookingHandler extends Handler {
  db = Database.getInstance();
  async handle(booking) {
    await this.db.create({
      table_name: "booking",
      columns: Object.keys(booking),
      values: Object.values(booking),
    });
    super.handle(booking);
  }
}

class DeleteBookingHandler extends Handler {
  db = Database.getInstance();
  async handle({ booking_id }) {
    await this.db.delete({
      table_name: "booking",
      where: [{ column: "id", value: booking_id }],
    });
    super.handle({ booking_id });
  }
}

module.exports = {
  CheckBookingExistHandler,
  CreateBookingHandler,
  DeleteBookingHandler,
  UpdateBookingHandler,
};
