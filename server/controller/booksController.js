const db = require('../connection');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ name: String });
const User = db.model('users', userSchema);


exports.books = async function(req,res){
    await User.create({ name: 'Axl Rose' });
    return res.status(200).json({ "res" :"ok"});
}

