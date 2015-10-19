(function(){
  var comments = [];
  var loadCommentJson = function(callback){
    var url = 'https://www.reddit.com/r/dataisbeautiful/comments/3pckdc.json';

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        callback(data);
      } else {
        // We reached our target server, but it returned an error
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };
    request.send();
  };
  var processComments = function(json){
    for (var i = 0; i < json.length; i++) {
      element = json[i];
      if (element.kind == "Listing"){
        processComments(element.data.children);
      } else if (element.kind == "t1") {
        console.log(element.data.body);
        if (element.data.replies){
          processComments(element.data.replies.data.children);
        }
      }
    };
  };
  var Comment = function(json){

  };

  loadCommentJson(processComments);
})();
