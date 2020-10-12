const express  = require('express');
const app      = express();
const port     = 3000;

const connect = require('./connect');

app.get('/get-highscore', (req, res) =>{
    // connect.insert("Jared", 150, console.log("Inserted 150"))
    console.log(connect.read())

    console.log("Sookida")
})

app.listen(port, () => {
  
    console.log(`Example app listening at http://localhost:${port}`);
})
