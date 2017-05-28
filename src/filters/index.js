const urlParser = document.createElement('a');
const request = require("browser-request");

import store from '../store';

export function checkAuth (url) {

    var token = store.get('flashboard_token');
  
    if(token != null){
        request({method:'GET', 
            url: url+'Users/findOne',
            headers: {
              'Authorization': token,
              'origin-when-cross-origin':'*'
            },
            "xhrFields": { "withCredentials": true }
        }, function (er, response, body) {
          if(er){
            window.location.assign('#/unavailable');
            throw er
          }
          
          if(typeof JSON.parse(body).error != "undefined"){
            if(JSON.parse(body).error['statusCode']==401){
                window.location.assign('#/login');
            } else{
            }
          }

        });
    } else {
      console.log('boro berim')
        window.location.assign('#/login');
    }

}

export function loading(mode){
  if(mode!='start')
      document.querySelector('.mu-linear-progress').classList.add('hide');
  else
      document.querySelector('.mu-linear-progress').classList.remove('hide');
}

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function fromNow (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }

    return time + label + 's';
}
