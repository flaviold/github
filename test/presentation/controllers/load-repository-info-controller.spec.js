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
  class LoadRepositoryInfoSpy {
    constructor() {
      this.result = makeInfo();
    }

    async load(author, repository) {
      this.author = author;
      this.repository = repository;

      return this.result;
    }
  }

  return new LoadRepositoryInfoSpy();
};

const makeSut = () => {
  const loadRepositoryInfoSpy = makeLoadRepositoryInfo();
  const sut = new LoadRepositoryInfoController({
    loadRepositoryInfo: loadRepositoryInfoSpy,
  });

  return {
    sut,
    loadRepositoryInfoSpy,
  };
};

describe('Load Repository Info Controller', () => {
  test('Should return 400 when author is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = { body: {} };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('author')));
  });

  test('Should return 400 when repository is not provided', async () => {
    const { sut } = makeSut();
    const httpRequest = { body: { author: 'author' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('repository')));
  });

  test('Should Call LoadRepositoryInfo with correct values', async () => {
    const { sut, loadRepositoryInfoSpy } = makeSut();
    const httpRequest = { body: { author: 'author', repository: 'repository' } };
    await sut.handle(httpRequest);
    expect(loadRepositoryInfoSpy.author).toBe('author');
    expect(loadRepositoryInfoSpy.repository).toBe('repository');
  });

  test('Should return 500 if LoadRepositoryInfo throws', async () => {
    const { sut, loadRepositoryInfoSpy } = makeSut();
    jest.spyOn(loadRepositoryInfoSpy, 'load').mockImplementationOnce(() => { throw new Error(); });
    const httpRequest = { body: { author: 'author', repository: 'repository' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError());
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = { body: { author: 'author', repository: 'repository' } };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(makeInfo()));
  });
});
