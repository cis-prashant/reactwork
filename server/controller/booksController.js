const db = require('../connection');
const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({ name: String });
const Books = db.model('books', booksSchema);


exports.books = async function(req,res){
    await Books.create({ name: 'Axl Rose' });
    return res.status(200).json({ "res" :"ok"});
}

