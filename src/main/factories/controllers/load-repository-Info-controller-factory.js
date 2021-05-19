const LoadRepositoryInfoController = require('../../../presentation/controller/load-repository-Info-controller');
const makeLoadRepositoryInfoUseCase = require('../usecases/load-repository-info-usecase-factory');

module.exports = () => new LoadRepositoryInfoController({
  loadRepositoryInfoUseCase: makeLoadRepositoryInfoUseCase(),
});
