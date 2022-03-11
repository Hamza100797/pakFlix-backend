const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fname: String,
    lname: String,
    email: String,
    password: String,
    address: String,
    state: String,
    phonenum: String,
    userType: String
})
module.exports = mongoose.model('users', usersSchema)