const fs = require('fs')
const cheerio = require('cheerio')
const superagent = require('superagent')
const baseUrl = 'https://mall.jd.com/index-'
const async = require('async')
const eventproxy = require('eventproxy')
var shop_name = []


fs.readFile('a.txt','utf-8',(err, res) => {
  if(err){
    console.log(err)
  }
  var shop_id = string_to_array(res)
  var ep = new eventproxy()
  async.mapLimit(shop_id,2,function(url, callback){
    setQuery(url,callback)
  },function(err, result){
    console.log(`final:${result}`)
  })
  ep.after('get_msg',shop_id.length,() => {
    fs.writeFile('b.txt','html',(err,res) => {
      if(err){
        console.log(err)
      }
      console.log('write success.')
    })
  })
  function setQuery(url, callback) {
    superagent.get(baseUrl + url + '.html').end((err,res) => {
      let $ = cheerio.load(res.text)
      console.log($('title').text().replace(' - 京东',''))
      ep.emit('send_msg')
      callback(null,1)
    })
  }

  function string_to_array(str) {
    return str.split(',')
  }
})

