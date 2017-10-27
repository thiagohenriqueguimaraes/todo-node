var http = require('http');
var fs = require('fs');
console.log("Starting web server at ");
http.createServer(function (req, res) {

  fs.readFile('source.js', function(err, data) {
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.write(data);
    console.log(data.toString())
    res.end();
  });
}).listen(8080);