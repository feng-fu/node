var express = require('express');
var request = require('request')
var app = express();
app.get('*', function (req, res) {
  console.log(req.path.length)
  var urlPath = 'http://expressjs.com' + (req.path.length > 1?req.path :req.path.replace('/', ''))
  console.log(urlPath)
  var sreq = request.get(urlPath);
  sreq.pipe(res);
  sreq.on('end', function(){
      console.log('done');
  });
});
app.listen(3002);
console.log('Express started on 127.0.0.1:3002');
