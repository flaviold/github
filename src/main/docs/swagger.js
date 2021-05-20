module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Github Repository Info API',
    version: '0.0.1',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  paths: {
    '/repositories': {
      get: {
        summary: 'Return repository languages info',
        parameters: [
          {
            in: 'query',
            name: 'author',
            required: true,
            description: 'Repository author',
            type: 'string',
          },
          {
            in: 'query',
            name: 'repository',
            required: true,
            description: 'Repository name',
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'A JSON array of language info',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      extension: {
                        type: 'string',
                      },
                      count: {
                        type: 'number',
                      },
                      lines: {
                        type: 'number',
                      },
                      bytes: {
                        type: 'number',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
