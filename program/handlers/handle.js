class Handler {
  setNextHandler(handler) {
    this.handler = handler;
  }
  async handle(req) {
    if (this.handler) {
      this.handler.handle(req);
    }
  }
}

module.exports = Handler;
