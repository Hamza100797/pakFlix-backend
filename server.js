const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
const studentroute = require('./Api/routes/student');
const facalityroute = require('./Api/routes/facality');
const usersroute = require('./Api/routes/users')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let cors = require("cors");


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//.....BodyParser Middleware....//

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// support parsing of application/json type post data
app.use(bodyParser.json());

//.....BodyParser Middleware....//

//.......Middleware -Routes......//
app.use('/student', studentroute);
app.use('/facality', facalityroute);
app.use('/users', usersroute);
app.use(cors());
app.use(cors({ origin: true, credentials: true }));
//.......Middleware -Routes......//


//......... connect MongoDB ......//
const uri = `mongodb+srv://hbk1007:03420299599@expressrestapi.yxoue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log(err))
//......... connect MongoDB ......//


//......Error Handling Bad Request .....//
app.use((req, res, next) => {
    res.status(404).json({
        "message": "Bad Request URL Not Found"
    })
})
//......Error Handling Bad Request .....//



app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})