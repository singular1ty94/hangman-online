var http = require("http");

exports.start = function(){
  var server = http.createServer(function (req, res){
    res.writeHead(200); //Okay
    res.end("hello");
  });
  server.listen(8000);
}
