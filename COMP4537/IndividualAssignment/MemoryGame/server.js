const express = require("express");
const bodyParser = require("body-parser");
// const router = express.Router();
const app = express();
const port     = 3000;

const connect = require('./connect');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    console.log("Making the GET request...")
    // connect.insert("SooKida", 150, console.log)
    let response = connect.read()
    console.log("This is the response: ", response)
    res.send(response)
})

app.post('/record-score', (req, res) => {
    var name = req.body.name;
    var score = req.body.score;
    // DO SOMETHING BELOW HERE
    res.send(connect.insert(name, score, console.log))
})

app.listen(port, () => {
  
    console.log(`Listening on http://localhost:${port}`);
})
