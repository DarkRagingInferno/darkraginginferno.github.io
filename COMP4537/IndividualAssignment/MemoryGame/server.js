// const express  = require("express");
// const sql      = require("mssql");
// const app      = express();
// const port     = process.env.port || 3000;
// const parser   = require('body-parser')

// app.use(parser.json());
// // app.use(function (req, res, next) {
// //     res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
// //     res.setHeader('Access-Control-Allow-Origin', "*");
// // })

// app.post("/get-scores", function(req, res) 
// {
//     res.header("Access-Control-Allow-Origin", "*");
//     console.log("inside get scores");
//     console.log(req.body); 
//     var config = 
//     {
//         user: 'sookida',
//         password: 'psek8whok@tict2KUCH',
//         server: 'memorydbjvb.database.windows.net', 
//         database: 'memorydb' 
//     };
//     sql.connect(config, function (err) 
//     {
//         if (err) console.log(err);

//         console.log("connection made");

//         var request = new sql.Request();
//         let insertQry = "insert into Score (name, score) values('" + req.body.username + "'," + parseInt(req.body.score) + ');'
//         request.query(insertQry, function (err) 
//         {
//             if (err) console.log(err)
//             request.query('select top 5 name, score from Score order by score desc', function (err, scores) 
//             {
//                 if (err) console.log(err)
//                 res.send(scores);
//             });
//         });
//     });
// })

// app.listen(port, () => {console.log(`Listening on port: ${port}`); })