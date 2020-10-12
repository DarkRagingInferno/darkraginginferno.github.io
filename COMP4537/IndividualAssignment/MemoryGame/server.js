const express = require('express');
const app = express();
const port = 3000;
const parser = require('body-parser');

const connect = require('./connect');


app.get('/get-highscore', (req, res) =>{
    // res.send(connect.read());
    connect.read()
    connect.insert("kelsey", 122, console.log(122))
    res.send('hello world!')
})

app.listen(port, () => {
  
    console.log(`Example app listening at http://localhost:${port}`);
})
