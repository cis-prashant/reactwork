const Books = require('../models/books');
const { check, validationResult } = require('express-validator');

exports.books = async function(req,res){
    await check('name', "Book name is required!").notEmpty().run(req);
    await check('author', 'Author name is required!').notEmpty().run(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array(), message: 'Could not create book!' });
    }

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