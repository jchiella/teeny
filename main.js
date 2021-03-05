const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();