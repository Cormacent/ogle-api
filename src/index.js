require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./api/models')

const api = express()

global.__basedir = __dirname + "/..";

api.use(express.json());
api.use(express.urlencoded({
    extended: true
}));
api.use(cookieParser());
api.use(express.static("api/public"));

const port = process.env.PORT;

api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

require('./api/routes/index')(api, express);

db.sequelize.sync().then(() => {
    api.listen(port, () => {
        console.log(`Database Connected ${port}`);
    })
}).catch((error) => {
    console.log(error)
    console.log('Failed Connect Database')
})