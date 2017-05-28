const cheerio = require('cheerio')
var request = require("request")
var fetch = require('node-fetch');

module.exports = function(links) {
  
  links.getHTML = function(url,cb) {
   	
   	fetch(url)
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        const $ = cheerio.load(body)
		cb(null, $('body').html());
    });

  };
  
  links.remoteMethod(
    'getHTML', {
      http: {
        path: '/getHTML',
        verb: 'get'
      },
      accepts: {arg: 'url', type: 'string'},
      returns: {
        arg: 'html',
        type: 'string'
      }
    }
  );
};