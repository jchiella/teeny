const fastify = require('fastify')({ logger: true });
const fastifyCors = require('fastify-cors');
const fastifyFormbody = require('fastify-formbody');
const fastifyMongooseAPI = require('fastify-mongoose-api');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { User, Channel, Post, Comment } = require('./models');

fastify.register(fastifyCors);
fastify.register(fastifyFormbody);
fastify.register(fastifyMongooseAPI, {
  models: mongoose.connection.models,
  prefix: '/api/',
  setDefaults: true,
  methods: ['list', 'get', 'post', 'patch', 'put', 'delete', 'options'],
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();