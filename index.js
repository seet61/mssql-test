//https://docs.microsoft.com/ru-ru/sql/t-sql/functions/sysdatetime-transact-sql

var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES; 

var config = {  
    userName: 'TestKab',  
    password: '12345678',  
    server: '93.81.242.163',  
    // If you are on Microsoft Azure, you need this:  
    options: {encrypt: true, database: 'TestKab'}  
};  

var connection = new Connection(config);  

connection.on('connect', function(err) {  
// If no error, then good to proceed.  
    console.log("Connected"); 
    executeStatement(); 
});  

function executeStatement() {  
    request = new Request("SELECT SYSDATETIMEOFFSET();", function(err) {  
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
    connection.execSql(request);  
}  