const express = require('express')
const app = express()
const superagent = require('superagent')
const cheerio = require('cheerio')
const port = 3000

const pathUrl = 'http://www.dy2018.com'

app.use('/', (req,response) => {
	superagent.get(pathUrl).end((err,res) => {
		if (err) {
			return next(err)
		}
		var $ = cheerio.load(res.text)

		var item = [],title = []
		$('.menu').each((idx,element) => {
			var $element = $(element)
			console.log(1)
			item.push($element.attr('href'))
		})

		for (var i in item) {
			superagent.get(pathUrl + item[i]).end((err,res) => {
				$('.co_area2 co_content8 b').each((index, element) => {
					let $element = $(element)
					title.push($element.text())
				})
			})
		}
		console.log(title, item)
		response.send(title)
	})
})

app.listen(port,(req, res) => {
	console.log(`server in ${port}`)
})