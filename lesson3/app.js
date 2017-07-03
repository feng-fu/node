const express = require('express')
const app = express()
const superagent = require('superagent')
const cheerio = require('cheerio')
const port = 3000
const fs = require('fs')
const eventproxy = require('eventproxy')

const pathUrl = 'http://www.mm131.com/'
const async = require('async')
var page_content = ''
const ep = new eventproxy()

<<<<<<< HEAD
app.use('/', (req,response) => {
	superagent.get(pathUrl).end((err,res) => {
		if (err) {
			return console.log(err)
		}
=======
app.use('/', (req, response) => {
    superagent.get(pathUrl).end((err, res) => {
        if (err) {
            return next(err)
        }
>>>>>>> 6bb33a44439f1e26b04228f144d1649fb98edebb

        var $ = cheerio.load(res.text)

        var item = [],
            title = '<style>img{width: 50%;}</style>'
        $('.new.public-box li a').each((idx, element) => {
            var $element = $(element)
            item.push($element.attr('href'))
        })

<<<<<<< HEAD
		for (let i = 0;i < item.length;i++) {
			let completeUrl = pathUrl + item[i]
			superagent.get(completeUrl).end((err,res) => {
				if(err){
					console.error(err)
				}
				try{	
					var $ = cheerio.load(res.text)
				}catch(err){
					return
				}

				let pageArr = []
				let countNum = 0
				let picAddress = []

=======
        for (let i = 0; i < item.length; i++) {
            superagent.get(item[i]).end((err, res) => {
                if (err) {
                    console.error(err)
                }
                var $ = cheerio.load(res.text)

                let pageArr = []
>>>>>>> 6bb33a44439f1e26b04228f144d1649fb98edebb

                $('.content-page a').each((index, element) => {
                    let $element = $(element)
                    let address = $element[0].attribs.href
                    pageArr.push(address)
                })

<<<<<<< HEAD
				for(let i = 0;i < pageArr.length;i++) {
					countNum++
					picAddress[countNum] = {}
					let completeUrl = pathUrl + pageArr[i]
					superagent.get(completeUrl).end((err,res) => {
						ep.emit('req_down')
						try{
							let $ = cheerio.load(res.text)
						}catch(err){
							return;
						}
						$('.content-page a').each((index, element) => {
							let $element = $(element)
							picAddress[countNum][i] = $element[0].attribs.href
						})
					})
				}
				ep.after('push_msg',picAddress.length,(err, res) => {
					app.send(page_content)
				})
=======
                //  需要消除异步问题
>>>>>>> 6bb33a44439f1e26b04228f144d1649fb98edebb


				//  需要消除移步问题
				ep.after('req_down',picAddress.length,(err,res) => {
					async.mapLimit(picAddress,1,(detail,callback) => {
						getPageDetail(detail,callback)
					},(err,result) => {
						console.log(result)
					})
				})

<<<<<<< HEAD

				function getPageDetail(detail, callback){
					for(let i in detail){
						console.log(i)
						let requestUrl = pathUrl + detail[i]
						superagent.get(requestUrl).end((err, res) => {
							if(err) console.log(err)
								eq.emit('push_msg')
							try {
								var $ = cheerio.load(res.text)
							}catch(err){
								return
							}
							console.log($('.content-pic img').attr('src'))
							page_content += '<img src=' + $('.content-pic img').attr('src') + '>'
							callback(null,1)
						})
					}
				}
			})
		}
	})
=======
                $('.content-pic img').each((index, element) => {
                    let $element = $(element)
                    let imgHtml = `<img src=${$element[0].attribs.src}>`
                        // title.push($element.attribs.src)
                    title += imgHtml
                    if (i === item.length - 1) {

                        response.send(title)
                        fs.writeFile('img.html', title, (err, res) => {
                            if (err) {
                                return console.error(err)
                            }
                            console.log(`success write`)
                        })
                    }
                })
            })
        }
    })
>>>>>>> 6bb33a44439f1e26b04228f144d1649fb98edebb
})

app.listen(port, (req, res) => {
    console.log(`server in ${port}`)
})