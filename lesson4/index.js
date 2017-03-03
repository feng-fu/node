var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')
var app = express()

var jdUrl = 'https://www.jd.com/'

var followPath = '6728-6747.html'

var port = 8080

var cate_menu = []

var cate = []

superagent.get(jdUrl, (err, res) => {
	if (err) {
		console.error(err)
	}

	var $ = cheerio.load(res.text)

	$('.JS_navCtn.cate_menu .cate_menu_item').each((index, element) => {
		var $element = $(element)
		var obj = {}
		obj.clstag = $element.attr('clstag')
		var cate_menu_item = []
		var cate_menu_lk = $element.find('.cate_menu_lk')
		cate_menu_lk.each((index1, ele) => {
			var $ele = $(ele);
			cate_menu_item.push($ele.text())
		})
		obj.detail = cate_menu_item
		cate_menu.push(obj)
	})
	var n = 0;
	$('.cate_detail_con_lk').each((index, element) => {
		var $element = $(element)
		cate.push($element.text())
	})
})


superagent.get(jdUrl + followPath, (err, res) => {
	if(err) {
		console.error(err)
	}
	var $ = cheerio.load(res.text)

	$('.item li a').each((index, element) => {
		let $element = $(element)
		cate.push($element.text())
	})

})


app.get('/',(req, res) => {
	res.send(cate_menu)
}).listen(port,(req, res) => {
	console.log(`server in ${port}`)
})