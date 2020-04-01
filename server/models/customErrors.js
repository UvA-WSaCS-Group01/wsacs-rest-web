class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

class IndexNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "IndexNotFoundError";
    }
  }

  module.exports = { NotFoundError, IndexNotFoundError };