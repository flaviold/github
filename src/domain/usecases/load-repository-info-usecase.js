module.exports = class LoadRepositoryInfoUseCase {
  constructor({ loadPathByCredentialsRepository, loadFileByPathRepository } = {}) {
    this.loadPathByCredentialsRepository = loadPathByCredentialsRepository;
    this.loadFileByPathRepository = loadFileByPathRepository;
  }

  async load(author, repository) {
    if (!author) throw new Error('author not provided');
    if (!repository) throw new Error('repository not provided');
    const files = [];

    const paths = await this.loadPathByCredentialsRepository.loadByCredentials(author, repository);

    for (const path of paths) {
      const info = await this.loadFileByPathRepository.loadFileByPath(path);
      files.push({
        file: path,
        ...info,
      });
    }

    return this.groupByLanguage(files);
  }

  groupByLanguage(files) {
    return files.reduce((acc, item) => {
      const language = acc.find(l => l.extension === item.extension);
      if (!language) {
        acc.push({
          extension: item.extension,
          count: 1,
          lines: item.lines,
          bytes: item.bytes,
        });
        return acc;
      }
      language.count += 1;
      language.lines += item.lines;
      language.bytes += item.bytes;

      return acc;
    }, []);
  }
};
