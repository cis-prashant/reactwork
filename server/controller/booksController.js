const Books = require('../models/books');
const { check, validationResult } = require('express-validator');

exports.books = async function(req,res,next){
    console.log('=================>',res.locals.user);
    console.log(req.body);
    let user = res.locals.user
    await check('name', "Book name is required!").notEmpty().run(req);
    await check('author', 'Author name is required!').notEmpty().run(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array(), message: 'Could not create book!' });
    }

    await Books.create({ name: req.body.name, author : req.body.author, user_id : user.id});
    return res.status(200).json({res:res.locals.user, success: true});
}

exports.findBook = async function(req,res){
    console.log(res.locals.user);
    var resData = await Books.findById(req.body.id);
    return res.status(200).json({resData});
}

exports.findBooks = async function(req,res){
    let user = res.locals.user
    var resData = await Books.find();
    return res.status(200).json({resData:resData, userData:user});
}

exports.deleteBook = async function(req,res){
    console.log(req.params);
    var resData = await Books.findByIdAndDelete(req.params.id);
    return res.status(200).json({resData});
}

exports.updateBook = async function(req, res) {
    console.log("UPDATE============>",req.body);
    await check('name', "Book name is required!").notEmpty().run(req);
    await check('author', 'Author name is required!').notEmpty().run(req);
    // await check('id', 'Book Id is required!').notEmpty().run(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array(), message: 'Could not update book!' });
    }

    let book = await Books.findById(req.body.id);
    if(book) {
        book.name = req.body.name;
        book.author = req.body.author;
        await book.save();
        return res.status(200).json({ "res" :"ok"});
    } else {
        return res.status(422).json({ "res" :"Book not found!"});
    }
}