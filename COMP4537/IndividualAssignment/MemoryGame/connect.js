var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');


// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "sookida", // update me
      password: "psek8whok@tict2KUCH" // update me
    },
    type: "default"
  },
  server: "memorygamejvbp.database.windows.net", // update me
  options: {
    database: "MemoryGameDB", //update me
    encrypt: true
  }
};

const connection = new Connection(config);


function start(callback)
{
  console.log("Starting......");
  callback(null, 'Kida', 46)
}

function read() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  request = new Request(
    `SELECT TOP 10 Score.Name, Score.score
     FROM [dbo].[Score]`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    });

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });

    return columns
  });

  connection.execSql(request);
}

function insert(name, score, callback)
{
  console.log("inserting [" + name + ", " + score + "] into Table...");

  request = new Request( 
    'INSERT INTO  dbo.Score (Name, Score) VALUES (@Name, @Score);',
    function(err, rowCount, rows)
    {
      if (err) { callback(err) }
      else
      {
        console.log(rowCount + ' row(s) inserted');
        callback(null, name, score);
      }
    });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Score', TYPES.Int, score)

    connection.execSql(request);
}
function complete(err, result) {
  if (err) { console.log(err); } 
  else { console.log("Done!"); }
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');

    // // Execute all functions in the array serially
    // async.waterfall([
    //     start,
    //     insert,
    //     read
    // ], complete)
  }
});

module.exports = {
  "read": read,
  "insert": insert,
  "complete": complete
}