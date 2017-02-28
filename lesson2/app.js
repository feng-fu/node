var express = require('express')
var utility = require('utility')

var app = express()

app.get('/',(req,res) => {
  var q = req.query.q;
  var md5Value = utility.sha1(q)
  res.send(md5Value)
}).listen(3000,(req,res) => {
  console.log('server in port 3000')
})
