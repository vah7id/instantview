const cheerio = require('cheerio')
var request = require("request")
var fetch = require('node-fetch');


module.exports = function(links) {

  links.getHTML = function(url,cb){
    url = encodeURI(url);
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

  links.generateTpl = function(url,cb) {
   url = encodeURI(url);
   fetch(url,{ headers: { 'User-Agent': 'Web/2.0'} }).then(function(res) {
        return res.text();
    }).then(function(body) {
    	
      const $ = cheerio.load(body)

      var html = {
      	body: $('body').html()
      };

      var results = '';
      var checklist = {
        title: false,
        body: false,
        cover: false,
        published_date: false,
        author: false,
        description: false
      }

      if($('meta[property="og:title"]').length>0){
        results += 'title: //meta[@property="og:title"]/@content'+' \n'
        checklist.title = true;
      }

      if($('meta[property="twitter:title"]').length>0){
        results += 'title: //meta[@property="twitter:title"]/@content'+' \n'
        checklist.title = true;

      }

      if($('title')){
        results += 'title: //title'+' \n'
        checklist.title = true;

      }

      if($('div[itemtype="http://schema.org/Article"]').length>0){
        results += 'body: //div[@itemtype="http://schema.org/Article"]'+' \n'
        checklist.body = true;

      }

      if($('article').length>0){
        results += 'body: //article'+' \n'
        checklist.body = true;
      }

      if($('meta[property="og:image"]').length>0){
        results += '@replace_tag(<img>): //meta[@property="og:image"]'+ ' \n';
        results += '@set_attr(src, @content): //img[@property="og:image"]'+ ' \n';
        results += 'cover: //img[@property="og:image"]'+ ' \n';
        checklist.cover = true;
      }

      if($('meta[property="twitter:image"]').length>0){
        results += '@replace_tag(<img>): //meta[@property="twitter:image"]'+ ' \n';
        results += '@set_attr(src, @content): //img[@property="twitter:image"]'+ ' \n';
        results += 'cover: //img[@property="twitter:image"]'+ ' \n';
        checklist.cover = true;
      }

      if($('meta[itemprop="image"]').length>0){
        results += '@replace_tag(<img>): //meta[@itemprop="image"]'+ ' \n';
        results += '@set_attr(src, @content): //img[@itemprop="image"]'+ ' \n';
        results += 'cover: //img[@itemprop="image"]';
        checklist.cover = true;
      }

      if($('img[itemprop="image"]').length>0){
        results += 'cover: //img[@itemprop="image"]'+' \n'
        checklist.cover = true;
      }

      if($('img[itemprop="image url"]').length>0){
        results += 'cover: //img[@itemprop="image url"]'+' \n'
        checklist.cover = true;

      }

      if($('meta[property="article:published_time"]').length>0){
        results += 'published_date: //meta[@property="article:published_time"]/@content'+' \n'
        checklist.published_date = true;

      }

      if($('meta[property="article:published_date"]').length>0){
        results += 'published_date: //meta[@property="article:published_date"]/@content'+' \n'
        checklist.published_date = true;

      }

      if($('meta[property="article:author"]').length>0){
        results += 'author: //meta[@property="article:author"]/@content'+' \n'
        checklist.author = true;

      }

      if($('meta[property="og:description"]').length>0){
        results += 'description: //meta[@property="og:description"]/@content'+' \n'
        checklist.description = true;
      }

      results += 'image_url: $cover'+' \n'

		  cb(null, { tpl: results, checklist: checklist } );

    });

  };



  links.remoteMethod(
    'generateTpl', {
      http: {
        path: '/generateTpl',
        verb: 'get'
      },
      accepts: {arg: 'url', type: 'string'},
      returns: {
        arg: 'html', 
        type: 'Object'
      }
    }
  );

  links.remoteMethod(
    'getHTML', {
      http: {
        path: '/getHTML',
        verb: 'get'
      },
      accepts: {arg: 'url', type: 'string'},
      returns: {
        arg: 'html',
        type: 'Object'
      }
    }
  );
};