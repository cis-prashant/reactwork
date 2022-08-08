// getting-started.js
const mongoose = require('mongoose');

async function connect() {
  // const conn = await mongoose.createConnection('mongodb://localhost:27017/react');
  // return conn;
}

const conn = mongoose.createConnection('mongodb://localhost:27017/react');

module.exports = conn;