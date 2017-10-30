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


else if (req.url === '/removeTodo' && req.method === 'POST') {
    	console.log('/removeTodo')
        var body = '';
        req.on('data', function (data) {
            body += data;
        }).on('end', function () {
            var todo = JSON.parse(body);
            if (!todo || todo.id === "") {
                var response = {
                    status  : 500,
                    success : 'Erro'
                };
                res.end(JSON.stringify(response));
            } else {
                todos = todos.filter(function(el) {
                    return el.id !== todo.id;
                });

                var response = {
                    status  : 200,
                    success : 'Updated Successfully'
                };
                res.end(JSON.stringify(response));
            }
        })
    }