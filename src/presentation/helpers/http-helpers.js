const badRequest = (error) => ({
  statusCode: 400,
  body: error,
});

const serverError = () => ({
  statusCode: 500,
});

module.exports = {
  badRequest,
  serverError,
};
