
const express = require("express");
const router = express.Router();
const StudentModel = require('../Models/students')
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    const students = StudentModel.find()
        .then(result => {
            console.log(`Data is Getting Suucessfully ${result}`)
            res.status(200).json({
                studentsRecord: result
            })
        })
        .catch(err => {
            console.log(`Error in getting Student record ${err}`)
            res.status(500).json({
                error: err
            })
        })

})

router.get('/:id', (req, res, next) => {
    StudentModel.findById(req.params.id)
        .then(result => {
            console.log(`Student Record Found ${result}`)
            if (result) {
                res.status(200).json({
                    student_Record: result,
                })
            }
            else {
                res.status(404).json({
                    "Message": "Student Record Not found"
                })
            }

        })
        .catch(err => {
            console.log(`Error in getting Student record ${err}`)
            res.status(500).json({
                error: err
            })
        })

})
router.post('/', (req, res, next) => {
    const studentRecord = new StudentModel({
        _id: new mongoose.Types.ObjectId,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        semester: req.body.semester,
        phonenum: req.body.phonenum,
        IsActiveStd: req.body.IsActiveStd
    })
    console.log(studentRecord);
    studentRecord.save()
        .then(result => {
            console.log(`Data is adds susscessfully ${result}`)
            res.status(200).json({
                newstudent: result
            })
        })
        .catch(err => {
            console.log("errrorOccur")
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:id', (req, res, next) => {
    console.log(req.params.id)
    StudentModel.remove({ _id: req.params.id })
        .then(result => {
            console.log(`Data is Getting Suucessfully ${result}`)
            res.status(200).json({
                "Message": "Record deleted succesfully",
                deletedRecord: result
            })
        })
        .catch(err => {
            console.log(`Error in deleting Student record ${err}`)
            res.status(500).json({
                "Message": "Something Went wrong While Delteing Record",
                error: err
            })
        })
})

router.put('/:id', (req, res, next) => {
    console.log(req.params.id);
    StudentModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            semester: req.body.semester,
            phonenum: req.body.phonenum,
            IsActiveStd: req.body.IsActiveStd
        }
    })
        .then(result => {
            console.log(`Student Record Update Suucessfully ${result}`)
            res.status(200).json({
                "Message": "Student Record Update succesfully",
                UpdatedRecord: result
            })
        })
        .catch(err => {
            console.log(`Error in Updating Student record ${err}`)
            res.status(500).json({
                "Message": "Something Went wrong While Updating Record",
                error: err
            })
        })
})




module.exports = router;
