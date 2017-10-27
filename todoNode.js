  $(function() {

    function loadGrid () {
      $.get("http://localhost:8000/todos", function (videos) {

        videos.forEach(function(video) {
          $(".todo-list").append('<li class="todo"> <div class="view"> <input class="toggle" type="checkbox"> <label>'+video.name+'</label> <button class="destroy"></button> </div> <input class="edit" id="edit" type="text"> </li>')
        });

      }, "json");
    }

    loadGrid();

    $("#new-todo").on("keyup", function(e) {
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)e.preventDefault();
      if(code==32||code==13||code==188||code==186) {
        var video = JSON.stringify({ name : $(this).val(), id : 1});
        $.post("http://localhost:8000/newTodo", video, function (result) {
          $(".todo-list").append('<li class="todo"> <div class="view"> <input class="toggle" type="checkbox"> <label>'+video.name+'</label> <button class="destroy"></button> </div> <input class="edit" id="edit" type="text"> </li>')
          console.log(result);
        }, "json");
        
      } // missing closing if brace
    });

    $("#edit").on("keyup", function() {
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)e.preventDefault();
      if(code==32||code==13||code==188||code==186){
        $("#displaysomething").html($(this).val());
      } // missing closing if brace
    });
  });