var fs = require("fs");
var responseErro = {
    status  : 500,
    success : 'Erro'
};
var responseSuccess = {
    status  : 200,
    success : 'Updated Successfully'
};
var todos = [];
var pathSource = ".\\rep\\source.js";

function guid() {
   'use strict';
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
exports.remove = function(req, res) {
    console.log('exports.remove');
    var body = '';
    req.on('data', function (data) {
        body += data;
    }).on('end', function () {
        var todo = JSON.parse(body);
        if (!todo || todo.id === "") {
            res.end(JSON.stringify(responseErro));
        } else {
            todos = todos.filter(function(el) {
                return el.id !== todo.id;
            });
            res.end(JSON.stringify(responseSuccess));
        }
    })
};
exports.save = function(req, res) {
    console.log('exports.save');
    var body = '';
    req.on('data', function (data) {
        body += data;
    }).on('end', function () {
        var todo = JSON.parse(body);
        if (!todo || todo.name === "") {
            res.end(JSON.stringify(responseErro));
        }
        if(todo.id) {
            var todoDb = todos.find(function(t) {
                return t.id == todo.id;
            });
            todoDb.name = todo.name;
            todoDb.completed = todo.completed;
        } else {
            todo.id = guid();
            todos.push(todo);
        }

        fs.writeFile(pathSource, JSON.stringify(todos));
        responseSuccess.data = todo;
        res.end(JSON.stringify(responseSuccess));
    });
};

exports.load = function(callback, req, res) {
    console.log('exports.load');
    fs.readFile(pathSource, (err, result) => {
        if (err) {
            console.log('err:'+err);
        }
        todos = JSON.parse(result.toString());
        callback(req, res);
        return todos;
    });
}
