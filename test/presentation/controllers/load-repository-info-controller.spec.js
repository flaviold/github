const LoadRepositoryInfoController = require('../../../src/presentation/controller/load-repository-Info-controller');
const { ok, badRequest, serverError } = require('../../../src/presentation/helpers/http-helpers');
const MissingParamError = require('../../../src/presentation/errors/missing-param-error');

const makeInfo = () => [{
  extension: 'Javascript',
  count: 2,
  lines: 20,
  bytes: 250,
}];

const makeLoadRepositoryInfo = () => {
  class LoadRepositoryInfoUseCaseSpy {
    constructor() {
      this.result = makeInfo();
    }

    async load(author, repository) {
      this.author = author;
      this.repository = repository;

      return this.result;
    }
  }

  return new LoadRepositoryInfoUseCaseSpy();
};

const makeSut = () => {
  const loadRepositoryInfoUseCaseSpy = makeLoadRepositoryInfo();
  const sut = new LoadRepositoryInfoController({
    loadRepositoryInfoUseCase: loadRepositoryInfoUseCaseSpy,
  });

  return {
    sut,
    loadRepositoryInfoUseCaseSpy,
  };
};

describe('Load Repository Info Controller', () => {
  test('Should return 400 when author is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = { query: {} };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('author')));
  });

  test('Should return 400 when repository is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = { query: { author: 'author' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('repository')));
  });

  test('Should Call LoadRepositoryInfo with correct values', async () => {
    const { sut, loadRepositoryInfoUseCaseSpy } = makeSut();
    const httpRequest = { query: { author: 'author', repository: 'repository' } };
    await sut.handle(httpRequest);
    expect(loadRepositoryInfoUseCaseSpy.author).toBe('author');
    expect(loadRepositoryInfoUseCaseSpy.repository).toBe('repository');
  });

  test('Should return 500 if LoadRepositoryInfo throws', async () => {
    const { sut, loadRepositoryInfoUseCaseSpy } = makeSut();
    jest.spyOn(loadRepositoryInfoUseCaseSpy, 'load').mockImplementationOnce(() => { throw new Error(); });
    const httpRequest = { query: { author: 'author', repository: 'repository' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError());
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = { query: { author: 'author', repository: 'repository' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(makeInfo()));
  });
});
