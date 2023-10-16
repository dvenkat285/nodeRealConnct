var Connection = require('tedious').Connection;  
var config = {  
    server: '172.16.15.26',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: 'Pa55w0rd99'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        "encrypt": false,
        "enableArithAbort": true,
        database: 'MDMS'  //update me
    }
};  
var connection = new Connection(config);  
connection.on("connect", function (err) {
    if(err) {
      console.log('Error: ', err)
    } else {
      console.log("Successful connection");
      executeStatement();
    }
  });
connection.connect();
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    request = new Request("select * from vw_tmu", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}  


