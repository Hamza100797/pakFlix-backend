const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../Models/users');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secretkey = "this is sceret key bahi jaan hath na layna mekiu"
router.get('/', (req, res, next) => {
    res.status(200).json({
        masg: "Getting routes of user"
    })
})


router.post('/register', (req, res, next) => {
    console.log(req.body)
    if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password || !req.body.phonenum || !req.body.state || !req.body.city || !req.body.address) {
        return res.status(500).json({
            'message': "Please Fill required Filds"
        })
    }

    Users.find({ email: req.body.email }, (err, data) => {
        if (data.length == 0) {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        message: "Erro While Hashing Password"
                    })
                }
                else {
                    const newuser = new Users({
                        _id: new mongoose.Types.ObjectId,
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        password: hash,
                        phonenum: req.body.phonenum,
                        userType: "admin",
                        address: req.body.address,
                        state: req.body.state,
                        city: req.body.city
                    })
                    console.log(`newuser vaule ${newuser}`)
                    newuser.save()
                        .then(result => {
                            console.log(`Data is adds susscessfully ${result}`)
                            res.status(200).json({
                                newuser: result,
                                "message": "User Register Successfully"
                            })
                        })
                        .catch(err => {
                            console.log("errrorOccur")
                            res.status(500).json({
                                error: err,
                                message: "User not added"
                            })
                        })
                }
            })
        }
        else {
            return res.status(404).json({
                error: err,
                'message': "Email already Exist"
            })
        }
    })

})

router.post('/login', (req, res, next) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(500).json({
            error: err,
            message: "Please Fill required Filds"
        })
    }
    Users.find({ email: req.body.email })
        .exec()

        .then(user => {
            console.log(`Hello ${user}`)
            if (user.length < 1) {
                return res.status(401).json({
                    error: err,
                    message: "User Not Found"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, data) => {
                if (!data) {
                    return res.status(401).json({
                        error: err,
                        message: "Password not match"
                    })
                }
                if (data) {
                    const token = jwt.sign({
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        userType: req.body.userType,
                        phonenum: req.body.phonenum
                    }, secretkey, { expiresIn: '24h' });
                    res.status(200).json({
                        fname: user[0].fname,
                        lname: user[0].lname,
                        email: user[0].email,
                        userType: user[0].userType,
                        phonenum: user[0].phonenum,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            console.log("errrorOccur")
            res.status(500).json({
                error: err,
                message: "Email not register"
            })
        })
})







module.exports = router;