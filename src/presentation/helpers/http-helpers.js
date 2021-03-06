const ok = (data) => ({
  statusCode: 200,
  body: data,
});

const badRequest = (error) => ({
  statusCode: 400,
  body: error.message,
});

const serverError = () => ({
  statusCode: 500,
});

module.exports = {
  ok,
  badRequest,
  serverError,
};
