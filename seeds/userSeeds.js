const { User } = require('../models');

// creating user data
const userData = [
  {
    userName: "codeblogger",
    email: "codeblogger@gmail.com",
    password: "password"
  },
  {
    userName: "amazingcoder",
    email: "amzingcoder@gmail.com",
    password: "p@ssword2"
  },

]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;