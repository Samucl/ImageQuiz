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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const animals1 = require('random-animals-api');
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

app.post("/api/scoreAnimals", urlencodedParser, authenticateToken , function (req, res) {
    let jsonObj = req.body;
    (async () => {
        try {
            if(jsonObj == null){
                return
            }
            let sql = "SELECT score FROM animals_scores WHERE userid = (SELECT id FROM user WHERE username = ?)";
            let result = await query(sql, [req.user.name.username]);

            if(result.length === 0) {
                sql = "INSERT INTO animals_scores (score, userid) VALUES (?, (SELECT id FROM user WHERE username = ?))";
                await query(sql, [jsonObj.points, req.user.name.username]);
            }
            if(jsonObj.points > result[0].score) {
                sql = "UPDATE animals_scores SET score = ? WHERE (SELECT id FROM user WHERE username = ?)";
                await query(sql, [jsonObj.points, req.user.name.username]);
            }

            res.status(200).send("POST succesful " + req.body);
        } catch (err) {
            res.status(400).send("POST was not succesful " + err);
        }
    })()
});

app.post("/api/checkUsername", urlencodedParser, authenticateToken, function (req, res){
    (async () => {
        try {
            const user = req.user;
            res.status(200).send(user.name.username)
        }catch (err){}
    })()
});

app.get('/api/getAnimals', (req, res) => {
    (async () => {
        try {
            let names = ["Kissa", "Koira", "Kani", "Ankka", "Kettu", "Lisko", "Koala", "Panda"]
            const sortRand = Math.random()
            names = names.sort(() => sortRand - 0.5)
            //Luodaan taulukko jossa eri random-animal-apin funktioita
            let functions = [animals1.cat, animals1.dog, animals1.bunny, animals1.duck, animals1.fox, animals1.lizard, animals1.koala, animals1.panda]
            functions = functions.sort(() => sortRand - 0.5)
            const rand = Math.floor(Math.random() * 7);
            functions[rand]()
                .then(url => res.send({url: url, item: rand, names: names}))
                .catch((error) => console.error(error));
        }
        catch (err) {
            console.log(err);
        }
    })()
});

app.get('/api/getEmojis', (req, res) => {
    (async () => {
        try {
            testi = [1, 2, 3, 4, 5, 6, 7, 8]


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

app.post("/api/getXp", urlencodedParser, authenticateToken, function (req, res){
    (async () => {
        try {
            const user = req.user.name.username;
            let queryString = "SELECT xp FROM user WHERE username = ?"
            let result = await query(queryString, [user]);
            const xp = result[0].xp
            await res.status(200).json({xp: xp})
        }catch (err){}
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