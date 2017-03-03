var eventproxy = require('eventproxy')
var superagent = require('superagent')
var cheerio = require('cheerio')
var express = require('express')
var app = express()

var url = require('url')
var cnodeUrl = 'https://cnodejs.org/'
var topicUrls = []
var response;

superagent.get(cnodeUrl).end((err, res) => {
  if (err) {
    return console.err(err);
  }
  response = res
  var $ = cheerio.load(res.text);
  $('#topic_list .topic_title').each((idx, element) => {
    var $element = $(element)
    var obj = {}
    obj.href = url.resolve(cnodeUrl, $element.attr('href'))
    obj.title = $element.attr('title')
    topicUrls.push(obj)
  })
})


var ep = new eventproxy()

ep.after('topic_html', topicUrls.length, function (topics) {
  topics = topics.map(function(topicPair) {
    var topicUrl = topicPair[0]
    var topicHtml = topicPair[1]
    var $ = cheerio.load(topicHtml)
    return ({
      title: $('.topic_full_title').text().trim(),
      href: topicUrl,
      commit1: $('.reply_content').eq(0).text().trim()
    })
  })
})



app.get('/',(req, res) => {
  res.send(response)
}).listen(3000, (req, res) => {
  console.log(`server in 3000`)
})
