class ForbiddenError extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = 'попытка удалить чужой фильм';
  }
}

module.exports = { ForbiddenError };
