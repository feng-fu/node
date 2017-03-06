const async = require('async')
const cheerio = require('cheerio')
const url = require('url')
const superagent = require('superagent')
const eventproxy = require('eventproxy')
const urlPath = 'https://jd.com'
var currentCount = 0

superagent.get(urlPath).end((err, res) => {
	if(err){
		console.error(err)
	}
	$ = cheerio.load(res.text)
	var topic_list = []
	var title_list = []
	$('.fs a').each((index, element) => {
		var $element  = $(element)
		topic_list.push(url.resolve(urlPath, $element.attr('href')))
	})

	var ep = new eventproxy()

	ep.after('send_msg',topic_list.length,() => {
		console.log(`everything down ${title_list}`)
	})

	async.mapLimit(topic_list, 2, function (url, callback) {
	  fetchUrl(url, callback);
	}, function (err, result) {
	  console.log(`final:${result.length}`);
	});

	function fetchUrl (url, callback) {
		console.log(++currentCount)
		superagent.get(url).end((err, res) => {
			if(err){
				console.log(err)
			}
    	--currentCount
    	console.log('in')
    	ep.emit('send_msg')
    	callback(null, 1)
			try
			{
      	$ = cheerio.load(res.text)
			}
			catch(err)
			{
				console.log(`err ocurred`)
				return
			}

			title_list.push($('div').eq(20).text())
		})
	};
})