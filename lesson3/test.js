var request = require('request')


request({
  har: {
  method: 'POST',
  url: 'https://so.m.jd.com/ware/tip.action',
  headers: [{
    name: 'content-type',
    value: 'application/json;charset=UTF-8'
  }, {
    name: 'referer',value:'https://m.jd.com/'
  }],
  postData: {
    mimeType: 'application/x-www-form-urlencoded',
    params: [
      {
        name: 'keyword',
        value: '四件套'
      },
      {
        name: '_format_',
        value: 'json'
      }
    ]
  }
  }
  
}, (res, body, err)=> {
  console.log(JSON.stringify(body))
})