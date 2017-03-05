const express = require('express')
const app = express()
const superagent = require('superagent')
const cheerio = require('cheerio')
const port = 3000
const fs = require('fs')

const pathUrl = 'http://www.mm131.com/'

app.use('/', (req,response) => {
	superagent.get(pathUrl).end((err,res) => {
		if (err) {
			return next(err)
		}

		var $ = cheerio.load(res.text)

		var item = [],title = '<style>img{width: 50%;}</style>'
		$('.new.public-box li a').each((idx,element) => {
			var $element = $(element)
			item.push($element.attr('href'))
		})

		for (let i = 0;i < item.length;i++) {
			superagent.get(item[i]).end((err,res) => {
				if(err){
					console.error(err)
				}
				var $ = cheerio.load(res.text)

				let pageArr = []

				$('.content-page a').each((index, element) => {
					let $element = $(element)
					let address = $element[0].attribs.href
					pageArr.push(address)
				})

				//  需要消除移步问题



				$('.content-pic img').each((index, element) => {
					let $element = $(element)
					let imgHtml = `<img src=${$element[0].attribs.src}>`
					// title.push($element.attribs.src)
					title += imgHtml
					if(i === item.length - 1){

						response.send(title)
						fs.writeFile('img.html', title, (err, res) => {
							if(err){attribs
								return console.error(err)
							}
							console.log(`success write`)
						})
					}
				})
			})
		}
	})
})

app.listen(port,(req, res) => {
	console.log(`server in ${port}`)
})