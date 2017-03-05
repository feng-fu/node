var express = require('express')
var cheerio = require('cheerio')
var superagent = require('superagent')
var app = express()

var shop_id = [51800,190307]
var port = 3000
var shop_name_arr = []



var url_name = 'https://mall.jd.com/index-'

var path_name = '.html'

for(let i = 0;i < shop_id.length;i++){
	let path = url_name + shop_id[i] + path_name
	superagent.get(path, (err, res) => {
		if (err) {
			console.error(err)
		}
		var $ = cheerio.load(res.text)

		$('.j-shopHeader').each((index, content) => {
			console.log(content)
			var shop_name = $(content)
			console.log(shop_name)
			shop_name_arr.push(shop_name)
		})
	})
}

app.get('', (req, res) => {
	res.send(shop_name_arr)
}).listen(port,(req, res) => {
	console.log(`server in ${port}`)
})
