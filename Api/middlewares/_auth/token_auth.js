const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        console.log(token)
        const verfiy = jwt.verify(token, "this is sceret key bahi jaan hath na layna mekiu");
        next()
    } catch (error) {
        return res.status(401).json({
            msg: "Token is unauthorized"
        })
    }
}