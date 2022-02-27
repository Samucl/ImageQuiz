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

function authenticateToken(req, res, next) {
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    console.log("token: " + token)
    if(token == null){
        return res.status(401).send("Tokenin luonnissa ongelma")
    }
    jwt.verify(token, secrets.jwtSecret, (err,user) => {
        if(err){
            return res.status(403).send("Käyttäjän todennus virheellinen")
        }
        req.user = user
        next()
    })
}

app.post("/api/checkUsername", urlencodedParser, authenticateToken, function (req, res){
    (async () => {
        try {
            const user = req.user;
            console.log("username: " + JSON.stringify(user.name.username))
            res.status(200).send(user.name.username)
        }catch (err){}
    })()
});

app.get('/api/getAnimal', (req, res) => {
    (async () => {
        try {
            //Luodaan taulukko jossa eri random-animal-apin funktioita
            const a = [animals.cat, animals.dog, animals.bunny, animals.duck, animals.fox, animals.lizard, animals.koala, animals.panda]
            let rand = Math.floor(Math.random() * 7);
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
            const email = req.body.email;
            let queryString = "SELECT * FROM user WHERE email = ?";
            let result = await query(queryString, [email]);
            console.log(result)
            const hashwordRes = (result[0].password).toString()
            const compare = await bcrypt.compare(req.body.password, result[0].password)
            if(compare){
                let user = {
                    username: result[0].username,
                    password: hashwordRes
                }
                const accessToken = jwt.sign({name: user}, secrets.jwtSecret, {expiresIn:"1h"})
                await res.status(202).json({accessToken: accessToken, username: user.username})
            }
            else
                res.status(203).send("Väärä tunnus tai salasana")
        } catch (err){
            res.status(204).send("Ongelma kirjautumisessa")
        }
    })()
});

app.post("/api/register", urlencodedParser, function (req, res) {
    (async () =>{
        try {
            const hashword = await bcrypt.hash(req.body.password, 5);
            const email = req.body.email;
            const username = req.body.username;
            let queryString = "SELECT * FROM user WHERE email = ?";
            let result = await query(queryString, [email]);
            if(result.length !== 0){
                res.status(203).send("Sähköposti käytössä");
                return
            }
            queryString = "SELECT * FROM user WHERE username = ?";
            result = await query(queryString, [username]);
            if(result.length !== 0){
                res.status(205).send("Käyttäjänimi käytössä");
                return
            }
            queryString = "INSERT INTO user (username, email, password) VALUES (?,?,?)";
            await query(queryString, [username, email, hashword]);
            res.status(202).send("Käyttäjä luotu")
        } catch (err){
            res.status(204).send("Ongelma rekisteröinnissä")
        }
    })()
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});