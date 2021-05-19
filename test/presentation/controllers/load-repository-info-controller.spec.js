const LoadRepositoryInfoController = require('../../../src/presentation/controller/load-repository-Info-controller');
const { badRequest } = require('../../../src/presentation/helpers/http-helpers');
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
});
