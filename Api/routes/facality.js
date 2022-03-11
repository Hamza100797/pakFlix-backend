
const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        "Message": "Getting facality request"
    })
    console.log("Getting facality request");
})
router.post('/', (req, res, next) => {
    res.status(200).json({
        "Message": "Posting facality request"
    })
    console.log("Posting facality request");
})


module.exports = router;