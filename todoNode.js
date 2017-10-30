  $(function() {
    'use strict';
    var todos = [];
    function loadGrid () {
      $.get("http://localhost:8000/todos", function (_todos) {
        todos = _todos;
        todos.forEach(function(video, index) {
          if(video.completed) {
            $(".todo-list").append('<li class="todo"> <div class="view"> <input class="toggle cktodo" type="checkbox" checked data-completed='+video.completed+' data-id='+video.id+'> <label>'+video.name+'</label> <button class="destroy"></button> </div> <input class="edit" id="edit" type="text"> </li>');
          } else {
            $(".todo-list").append('<li class="todo"> <div class="view"> <input class="toggle cktodo" type="checkbox" data-completed='+video.completed+' data-id='+video.id+'> <label>'+video.name+'</label> <button class="destroy"></button> </div> <input class="edit" id="edit" type="text"> </li>');
          }
        });

      }, "json");
    }

    loadGrid();

    $("#new-todo").on("keyup", function(e) {
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13) e.preventDefault();
      if(code==32||code==13||code==188||code==186) {
        var name = $(this).val();
        var video = JSON.stringify({ name : $(this).val(), id : $('#id').val(), completed: $('#id').val() ? $('#completed').val() : false});
        $.ajax({
          type: "POST",
          url: "http://localhost:8000/newTodo",
          data: video,
          datatype: "json", // expecting JSON to be returned
          contentType: "application/json; charset=utf-8",
          success: function (result) {
            var r = JSON.parse(result);
            if(r.status == 200) {
              todos.push(r.data);
              if(r.data.completed) {
                $(".todo-list").append('<li class="todo"> <div class="view"> <input class="toggle cktodo" type="checkbox" checked data-completed='+r.data.completed+' data-id='+r.data.id+'> <label>'+r.data.name+'</label> <button class="destroy"></button> </div> <input class="edit" id="edit" type="text"> </li>')
              } else {
                $(".todo-list").append('<li class="todo"> <div class="view"> <input class="toggle cktodo" type="checkbox" data-completed='+r.data.completed+' data-id='+r.data.id+'> <label>'+r.data.name+'</label> <button class="destroy"></button> </div> <input class="edit" id="edit" type="text"> </li>')
              }
              $("#new-todo").val('');
            };
          }
        });        
      }; // missing closing if brace
    });

    $("#edit").on("keyup", function() {
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)e.preventDefault();
      if(code==32||code==13||code==188||code==186){
        $("#displaysomething").html($(this).val());
      } // missing closing if brace
    });
    $(".todo-list").on("click", ".destroy", function(e) {
        $.ajax({
          type: "POST",
          url: "http://localhost:8000/removeTodo",
          data: {id : $(this).data("id") },
          datatype: "json", // expecting JSON to be returned
          contentType: "application/json; charset=utf-8",
          success: function (result) {
            var r = JSON.parse(result);
            if(r.status == 200){
                console.log(r.success);
            }
          }
        });
    })

    $(".todo-list").on("change", ".cktodo", function(e) {
        var id = $(this).data("id");
        var todo = todos.find(function(t) {
            return t.id == id
          });
        var video = JSON.stringify({ name : todo.name, id : todo.id, completed: $(this).is(":checked")});
        $.ajax({
          type: "POST",
          url: "http://localhost:8000/newTodo",
          data: video,
          datatype: "json", // expecting JSON to be returned
          contentType: "application/json; charset=utf-8",
          success: function (result) {
            var r = JSON.parse(result);
            if(r.status == 200){
              console.log(r.success);
            }
          }
        });
    });
  })