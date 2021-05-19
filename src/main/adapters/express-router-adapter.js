module.exports = (controller) => async (req, res) => {
  const httpRequest = {
    query: req.query,
  };

  const httpResponse = await controller.handle(httpRequest);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
