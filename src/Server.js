var express = require("express");
var app = express();
var bodyParser = require('body-parser'); // Create application/x-www-form-urlencoded parser (for POST)
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
var url = require('url');
var mysql = require('mysql');
var util = require('util'); // for async calls
//var utilPromisify = require('util.promisify').shim(); // ?? for connection pools
require('dotenv').config()
const secrets = require('../config/secrets.js');
console.log("secret: " + secrets.jwtSecret);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const animals = require('random-animals-api');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var insertedId; // global variable for SQL-updates

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imagequiz_db"
});
// node native promisify
const query = util.promisify(conn.query).bind(conn); // is bind needed?

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

app.get('/api/getAnimal', (req, res) => {
    (async () => {
        try {
            //Luodaan taulukko jossa eri random-animal-apin funktioita
            const a = [animals.cat, animals.dog, animals.bunny, animals.duck, animals.fox, animals.lizard, animals.koala, animals.panda]
            let rand = Math.floor(Math.random() * 7);
            console.log(rand)
            a[rand]()
                .then(url => res.send({url: url, item: rand}))
                .catch((error) => console.error(error));
        }
        catch (err) {
            console.log(err);
        }
    })()
});

app.post("/api/login", urlencodedParser, function (req, res) {
    (async () =>{
        try {
            const hashword = await bcrypt.hash(req.body.password, 5);
            const email = req.body.email;
            let queryString = "SELECT * FROM user WHERE email = ?";
            let result = await query(queryString, [email]);
            const hashwordRes = (result[0].password).toString()
            const compare = await bcrypt.compare(req.body.password, result[0].password)
            if(compare){
                let user = {
                    email: req.body.email,
                    password: hashwordRes
                }
                const accessToken = jwt.sign({name: user}, secrets.jwtSecret, {expiresIn:"1h"})
                console.log("Token luotu kirjautumisen yhteydessä: " + accessToken)
                await res.status(202).json({accessToken: accessToken})
            }
        } catch (err){
            console.log("Kirjautuminen ei onnistunut! " + err);
            res.status(400).send("POST ei onnistunut " + err)
        }
    })()
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});