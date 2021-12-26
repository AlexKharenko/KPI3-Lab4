class Booking {
  constructor() {
    (this.booking_id = undefined),
      (this.personal_data = undefined),
      (this.email = undefined),
      (this.table_id = undefined),
      (this.table_number = undefined),
      (this.date_time = undefined);
  }
  getData() {
    return {
      booking_id: this.booking_id,
      personal_data: this.personal_data,
      email: this.email,
      table_id: this.table_id,
      table_number: this.table_number,
      date_time: this.date_time,
    };
  }
}

module.exports = Booking;
