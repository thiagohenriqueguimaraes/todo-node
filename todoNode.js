  $(function() {

    $("#new-todo").on("keyup", function(e) {
      var code = e.which; // recommended to use e.which, it's normalized across browsers
      if(code==13)e.preventDefault();
      if(code==32||code==13||code==188||code==186) {
        var data = JSON.stringify({ name : $(this).val(), id : 1});
        $.post("http://localhost:8000/newTodo", data, function (result) {
            alert(result);
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