const { badRequest, serverError } = require('../helpers/http-helpers');
const MissingParamError = require('../errors/missing-param-error');

module.exports = class LoadRepositoryInfoController {
  constructor({ loadRepositoryInfo }) {
    this.loadRepositoryInfo = loadRepositoryInfo;
  }

  async handle(httpRequest) {
    try {
      const { author, repository } = httpRequest.body;

      if (!author) return badRequest(new MissingParamError('author'));
      if (!repository) return badRequest(new MissingParamError('repository'));

      await this.loadRepositoryInfo.load(author, repository);

      return null;
    } catch {
      return serverError();
    }
  }
};
