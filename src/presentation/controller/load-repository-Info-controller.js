const { badRequest } = require('../helpers/http-helpers');
const MissingParamError = require('../errors/missing-param-error');

module.exports = class LoadRepositoryInfoController {
  async handle(httpRequest) {
    const { author } = httpRequest.body;
    if (!author) return badRequest(new MissingParamError('author'));

    return null;
  }
};
