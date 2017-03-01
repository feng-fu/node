var eventproxy = require('eventproxy')
var superagent = require('superagent')
var cheerio = require('cheerio')

var url = require('url')
var cnodeUrl = 'https://cnodejs.org/'

superagent.get(cnodeUrl).end((err, res) => {
  if (err) {
    return console.err(err);
  }
  var topicUrls = []
  var $ = cheerio.load(res.text);
  $('#topic_list .topic_title').each((idx, element) => {
    var $element = $(element)
    var obj = {}
    obj.href = url.resolve(cnodeUrl, $element.attr('href'))
    obj.author = $element.attr('author')
    topicUrls.push(obj)
  })

  console.log(topicUrls)
})
