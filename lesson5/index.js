const async = require('async')
const cheerio = require('cheerio')
const url = require('url')
const superagent = require('superagent')
const eventproxy = require('eventproxy')
const urlPath = 'https://cnodejs.org'
var currentCount = 0

superagent.get(urlPath).end((err, res) => {
	if(err){
		console.error(err)
	}
	$ = cheerio.load(res.text)
	var topic_list = []
	var title_list = []
	$('#topic_list .topic_title').each((index, element) => {
		var $element  = $(element)
		topic_list.push(url.resolve(urlPath, $element.attr('href')))
	})

	var ep = new eventproxy()

	ep.after('send_msg',topic_list.length,() => {
		console.log(`everything down ${title_list}`)
	})

	async.mapLimit(topic_list, 5, function (url, callback) {
	  fetchUrl(url, callback);
	}, function (err, result) {
	  console.log(`final:${result.length}`);
	});

	function fetchUrl (url, callback) {
		console.log(++currentCount)
		superagent.get(url).end((err, res) => {
    	--currentCount
			$ = cheerio.load(res.text)
			console.log('in')
			title_list.push($('.topic_full_title').text())
			ep.emit('send_msg')
    	callback(null, 1)
		})
	};
})