const axios = require('axios');

module.exports = class LoadFileByPathRepository {
  async loadFileByPath(path) {
    const res = await axios.get(`https://github.com${path}`);
    const html = res.data.replace(/\n/g, '');

    return {
      extension: this.getFileExtension(html),
      bytes: this.getFileSize(html),
      lines: this.getFileLines(html),
    };
  }

  getFileExtension(html) {
    let match;

    match = /data-tagsearch-lang="([^"]+)"/g.exec(html);
    if (match) return match[1].toLowerCase();

    match = /type-([^ ]+) +gist-border-0/g.exec(html);
    if (match) return match[1];

    return 'desconhecido';
  }

  getFileSize(html) {
    const match = /file-info-divider.*?<\/span> *([^ ]*) (\w*)/g.exec(html);
    if (!match) return 0;

    const [, size, unit] = match;
    let expo = 0;

    switch (unit) {
      case 'KB':
        expo = 1;
        break;
      case 'MB':
        expo = 2;
        break;
      default:
    }

    return Number(size) * (1024 ** expo);
  }

  getFileLines(html) {
    const match = /text-mono f6 flex-auto pr-3 flex-order-2 flex-md-order-1.*?> *([0-9]+)/g.exec(html);
    if (!match) return 0;
    const [, lines] = match;

    return Number(lines);
  }
};
