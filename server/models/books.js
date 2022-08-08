const mongoose = require('mongoose');
const db = require('../connection');
const booksSchema = new mongoose.Schema({ name: String, author : String},{createdAt: new Date(0)});
module.exports = db.model('books', booksSchema);
