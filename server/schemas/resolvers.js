const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Note } = require('../models');

const resolvers = {};

module.exports = resolvers;