const LoadRepositoryInfoController = require('../../../src/presentation/controller/load-repository-Info-controller');
const { badRequest } = require('../../../src/presentation/helpers/http-helpers');
const MissingParamError = require('../../../src/presentation/errors/missing-param-error');

const makeSut = () => {
  const sut = new LoadRepositoryInfoController();

  return {
    sut,
  };
};

describe('Load Repository Info Controller', () => {
  test('Should return 400 when author is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = { body: {} };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('author')));
  });
});
