// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10)

var port = 8000;
var serverUrl = "127.0.0.1";

var http = require("http");
var path = require("path");
var fs = require("fs");
var checkMimeType = true;
var todos = [];
console.log("Starting web server at " + serverUrl + ":" + port);

function getFile(localPath, res, mimeType) {
    'use strict';
    fs.readFile(localPath, function (err, contents) {
        if (!err) {
            res.setHeader("Content-Length", contents.length);
            if (mimeType !== undefined) {
                res.setHeader("Content-Type", mimeType);
            }
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

// now `readFile` will return a promise rather than
// expecting a callback
function loadTodo() {
	  // Return the Promise right away, unless you really need to
  // do something before you create a new Promise, but usually
  // this can go into the function below
  return new Promise((resolve, reject) => {
    // reject and resolve are functions provided by the Promise
    // implementation. Call only one of them.
    fs.readFile('source.js', (err, result) => {
      // PS. Fail fast! Handle errors first, then move to the
      // important stuff (that's a good practice at least)
      if (err) {
        // Reject the Promise with an error
        return reject(err)
      }
          console.log('loadTodo');
      // Resolve (or fulfill) the promise with data
      return resolve(JSON.parse(result.toString()))
    })
  })
}
function readTodo() {
    fs.writeFile('source.js', JSON.stringify(todos));
    console.log('readTodo');
}
function addTodo(req, res) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    }).on('end', function () {
        var todo = JSON.parse(body);
        if (todo || todo.name === "") {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Nenhuma tarefa');
        }
        todos.push(todo);
    });
    console.log('addTodo');
}

http.createServer(function (req, res) {
    'use strict';
    if (req.url === '/newTodo' && req.method === 'POST') {

    	loadTodo()
    	.then(videos => {
		    addTodo(req, res);
		    readTodo();
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Salvo!');
	    })
	    .catch(err => {
	    // handle errors
	    });

        // How do I access the JSON payload as an object?
    }

    var filename = req.url || "index.html";

    if (req.url === "/todos") {
        filename = '\\source.js';
    }

    var ext = path.extname(filename);
    var localPath = __dirname;

    var validExtensions = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".ico": "image/x-icon",
        ".woff": "application/font-woff",
        ".woff2": "application/font-woff2"
    };

    var validMimeType = true;
    var mimeType = validExtensions[ext];
    if (checkMimeType) {
        validMimeType = validExtensions[ext] !== undefined;
    }

    if (validMimeType) {
        localPath += filename;
        fs.exists(localPath, function (exists) {
            if (exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, mimeType);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });

    } else {
        console.log("Invalid file extension detected: " + ext + " (" + filename + ")");
    }

}).listen(port, serverUrl);