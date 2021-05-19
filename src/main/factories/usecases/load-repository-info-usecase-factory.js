const LoadFileByPathRepository = require('../../../data/github-web/load-file-by-path-repository');
const LoadPathByCredentialsRepository = require('../../../data/github-web/load-path-by-credentials-repository');
const LoadRepositoryInfoUseCase = require('../../../domain/usecases/load-repository-info-usecase');

module.exports = () => {
  const loadFileByPathRepository = new LoadFileByPathRepository();
  const loadPathByCredentialsRepository = new LoadPathByCredentialsRepository();
  return new LoadRepositoryInfoUseCase({
    loadPathByCredentialsRepository,
    loadFileByPathRepository,
  });
};
