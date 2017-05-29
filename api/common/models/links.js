const cheerio = require('cheerio')
var request = require("request")
var fetch = require('node-fetch');

module.exports = function(links) {
  
  links.getHTML = function(url,cb) {

   fetch(url,{ headers: { 'User-Agent': 'Web/2.0'} }).then(function(res) {
        return res.text();
    }).then(function(body) {
    	
        const $ = cheerio.load(body)
        var html = {
        	body: $('body').html(),
        	bodyClasses : $('body').attr('class')
        };

  		if($('style')){
  			html['inline-css'] = [];
      		for(var i = 0 ; i<$('style').length ; i++)
	        	html['inline-css'].push ( $('style').eq(i).html() )
      	}
        

        if($('link[type="text/css"]') ){
        	html['link-css'] = [];
      		for(var j = 0 ; j<$('link[type="text/css"]').length ; j++){
        		html['link-css'].push( $('link[type="text/css"]').eq(j).attr('href') );
      		}
        }

        if($('link[rel="stylesheet"]') ){
       		if( html['link-css'].length == 0 )
   			 	html['link-css'] = [];

      		for(var j = 0 ; j<$('link[rel="stylesheet"]').length ; j++){
      			if($('link[rel="stylesheet"]').eq(j).attr('type') != 'text/css')
        			html['link-css'].push( $('link[rel="stylesheet"]').eq(j).attr('href') );
      		}
        }

		cb(null, html);

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