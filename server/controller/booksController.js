const Books = require('../models/books');


exports.books = async function(req,res){
    console.log(req.body);
    await Books.create({ name: req.body.name, author : req.body.author });
    return res.status(200).json({ "res" :"ok"});
}

exports.findBook = async function(req,res){
    console.log(req.body.id);
    var resData = await Books.findById(req.body.id);
    return res.status(200).json({resData});
}

exports.findBooks = async function(req,res){
    var resData = await Books.find();
    return res.status(200).json({resData});
}

exports.deleteBook = async function(req,res){
    console.log(req.params);
    var resData = await Books.findByIdAndDelete(req.params.id);
    return res.status(200).json({resData});
}