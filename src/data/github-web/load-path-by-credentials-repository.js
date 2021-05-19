const axios = require('axios');

module.exports = class LoadPathByCredentialsRepository {
  async loadByCredentials(author, repository) {
    const paths = await this.loadRepositoryFiles(`/${author}/${repository}`);
    return paths;
  }

  async loadRepositoryFiles(path) {
    let files = [];
    const res = await axios.get(`https://github.com${path}`);
    const html = res.data.replace(/\n/g, '');

    const { files: pathFiles, directories } = this.getFiles(html);

    files = files.concat(pathFiles);

    for (const directory of directories) {
      files = files.concat(await this.loadRepositoryFiles(directory));
    }

    return files;
  }

  getFiles(html) {
    const files = [];
    const directories = [];
    const regex = /rowheader.*?title="([^"]+)".*?href="([^"]+)/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
      if (match[1] === 'Go to parent directory') continue;
      if (match[2].split('/')[3] === 'tree') {
        directories.push(match[2]);
      } else {
        files.push(match[2]);
      }
    }

    return {
      files,
      directories,
    };
  }
};
