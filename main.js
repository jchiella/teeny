const fastify = require('fastify')({ logger: true });
const fastifyCors = require('fastify-cors');
const fastifyFormbody = require('fastify-formbody');
const fastifyMongooseAPI = require('fastify-mongoose-api');
const fastifyJWT = require('fastify-jwt');

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
  checkAuth: async (request, reply) => {
    if (request.method !== 'GET') {
      await request.jwtVerify();
      await User.findOne({ name: request.user.name }).orFail();
    }
  },
});
fastify.register(fastifyJWT, {
  secret: process.env.SECRET,
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.post('/signup', async (request, reply) => {
  await User.create(request.body);
  const token = fastify.jwt.sign(request.body, {
    expiresIn: '10d',
  });
  return { token };
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