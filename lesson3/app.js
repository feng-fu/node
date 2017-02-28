var express = require('express')
var app = express()
var superagent = require('superagent')
var cheerio = require('cheerio')
var port = 3000

app.use('/', (req,response) => {
	superagent.get('https://cnodejs.org/').end((err,res) => {
		if (err) {
			return next(err)
		}
		var $ = cheerio.load(res.text)
		var item = []
		$('#topic_list .topic_title').each((idx,element) => {
			var $element = $(element)
			item.push({
				title: $element.attr('title'),
				href: $element.attr('href'),
				logginname: $element.attr('class')
			})
		})
		response.send(item);
	})
})

app.listen(port,(req, res) => {
	console.log(`server in ${port}`)
})