const Books = require('../models/books');


exports.books = async function(req,res){

    await Books.create({ name: 'Axl Rose', author : "maam" });
    return res.status(200).json({ "res" :"ok"});
}

