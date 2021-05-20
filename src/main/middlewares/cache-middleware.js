const cache = require('memory-cache');

const memCache = new cache.Cache();

module.exports = (duration) => (req, res, next) => {
  const key = `__express__${req.originalUrl || req.url}`;
  const content = memCache.get(key);

  if (content) {
    return res.send(content);
  }

  res.jsonResponse = res.json;
  res.json = (body) => {
    memCache.put(key, body, duration * 1000);
    res.jsonResponse(body);
  };

  return next();
};
