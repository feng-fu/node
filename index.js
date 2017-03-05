var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')

console.log('project in...')

superagent.get('https://d.jd.com/navigation/get?callback=getNavigationCallback').end((err, res) => {
  if(err){
    console.error(err)
  }

  console.log( res)
})
