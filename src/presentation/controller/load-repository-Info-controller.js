const { badRequest, serverError, ok } = require('../helpers/http-helpers');
const MissingParamError = require('../errors/missing-param-error');

module.exports = class LoadRepositoryInfoController {
  constructor({ loadRepositoryInfoUseCase }) {
    this.loadRepositoryInfoUseCase = loadRepositoryInfoUseCase;
  }

  async handle(httpRequest) {
    try {
      const { author, repository } = httpRequest.body;

      if (!author) return badRequest(new MissingParamError('author'));
      if (!repository) return badRequest(new MissingParamError('repository'));

      const info = await this.loadRepositoryInfoUseCase.load(author, repository);

      return ok(info);
    } catch {
      return serverError();
    }
  }
};
