
var urllib  = require('url');
var request = require('request');
var _ = require('lodash')
var express = require('express')
var app = express()

app.use(express.static('app'))
app.get('/', (req, res) => {

})

var ALLOW_HOSTNAME = [
  'localhost:8011/public', 'www.gravatar.com',
  'gravatar.com', 'www.google-analytics.com',
];
exports.proxy = function (req, res, next) {
  var url = decodeURIComponent(req.query.url);
  var hostname = urllib.parse(url).hostname;

  if (ALLOW_HOSTNAME.indexOf(hostname) === -1) {
    return res.send(hostname + ' is not allowed');
  }

  request.get({
      url: url,
      headers: _.omit(req.headers, ['cookie', 'refer']),
    })
    .on('response', function (response) {
      res.set(response.headers);
    })
    .on('error', function (err) {
      console.error(err)
    })
    .pipe(res);
};