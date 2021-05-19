const LoadRepositoryInfoUseCase = require('../../../src/domain/usecases/load-repository-info-usecase');

const makePaths = () => ([
  'path 1',
  'path 2',
  'path 3',
]);

const makeFile = () => ({
  extension: 'Javascript',
  lines: 3,
  bytes: 100,
});

const makeLoadPathByCredentialsRepository = () => {
  class LoadPathByCredentialsRepositorySpy {
    constructor() {
      this.result = makePaths();
    }

    async loadByCredentials(author, repository) {
      this.author = author;
      this.repository = repository;

      return this.result;
    }
  }

  return new LoadPathByCredentialsRepositorySpy();
};

const makeLoadFileByPathRepository = () => {
  class LoadFileByPathRepositorySpy {
    constructor() {
      this.result = makeFile();
    }

    loadFileByPath(path) {
      this.path = path;
      return this.result;
    }
  }

  return new LoadFileByPathRepositorySpy();
};

const makeSut = () => {
  const loadPathByCredentialsRepositorySpy = makeLoadPathByCredentialsRepository();
  const loadFileByPathRepositorySpy = makeLoadFileByPathRepository();
  const sut = new LoadRepositoryInfoUseCase({
    loadPathByCredentialsRepository: loadPathByCredentialsRepositorySpy,
    loadFileByPathRepository: loadFileByPathRepositorySpy,
  });

  return {
    sut,
    loadPathByCredentialsRepositorySpy,
    loadFileByPathRepositorySpy,
  };
};

describe('Load Repository Info UseCase', () => {
  describe('load', () => {
    test('Should throw if author is not provided', () => {
      const { sut } = makeSut();
      const promise = sut.load();
      expect(promise).rejects.toThrow();
    });

    test('Should throw if repository is not provided', () => {
      const { sut } = makeSut();
      const promise = sut.load('author');
      expect(promise).rejects.toThrow();
    });

    test('Should call LoadPathByCredentialsRepository with correct values', async () => {
      const { sut, loadPathByCredentialsRepositorySpy } = makeSut();
      await sut.load('author', 'repository');
      expect(loadPathByCredentialsRepositorySpy.author).toBe('author');
      expect(loadPathByCredentialsRepositorySpy.repository).toBe('repository');
    });

    test('Should call LoadFileByPathRepository for every path', async () => {
      const {
        sut,
        loadPathByCredentialsRepositorySpy,
        loadFileByPathRepositorySpy,
      } = makeSut();
      const loadSpy = jest.spyOn(loadFileByPathRepositorySpy, 'loadFileByPath');
      await sut.load('author', 'repository');
      expect(loadSpy).toHaveBeenCalledTimes(loadPathByCredentialsRepositorySpy.result.length);
    });

    test('Should return info grouped by language', async () => {
      const { sut, loadPathByCredentialsRepositorySpy } = makeSut();
      const info = await sut.load('author', 'repository');
      const file = makeFile();
      const count = loadPathByCredentialsRepositorySpy.result.length;
      expect(info).toEqual(expect.arrayContaining([
        {
          extension: file.extension,
          count,
          lines: file.lines * count,
          bytes: file.bytes * count,
        },
      ]));
    });
  });
});
