'use strict';

const Hapi = require('@hapi/hapi');

const { supportedLanguages } = require('./lib/commands');
const { compile } = require('./compile');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  // Routes
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    },
  });

  server.route({
    method: 'POST',
    path: '/compile',
    handler: async (request, h) => {
      const ret = request.payload;
      if (ret.lang.trim().length === 0) {
        return h.response('Language is not specified!').code(500);
      } else if (ret.code.trim().length === 0) {
        return h.response('Code is not specified!').code(500);
      } else if (!supportedLanguages.includes(ret.lang)) {
        return h
          .response('The Language specified is currently not supported!')
          .code(501);
      } else {
        const cd = await compile(ret.lang, ret.input, ret.code);
        return h.response({ status: '200', response: cd }).code(200);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/list',
    handler: (request, h) => {
      return supportedLanguages;
    },
  });

  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return h.response('404 Error! Route Not Found!').code(404);
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
