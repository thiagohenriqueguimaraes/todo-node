var http = require('http');

var todos = []
http.createServer(function (req, res) {
	if (req.url == '/newTodo') {
		if(res.body.todo) {
			todos.push(todo);
			console.log(request.body.todo.name);
			res.write('Todo salvo');
	      	res.end();
		} else {
			res.write('Erro');
			res.end();
		}
	  }
	return res.end();
}).listen(8080);