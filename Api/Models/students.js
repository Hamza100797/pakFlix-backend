const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fname: String,
    lname: String,
    email: String,
    semester: Number,
    phonenum: Number,
    IsActiveStd: Boolean
})
module.exports = mongoose.model('student', studentSchema)