<template>

  <div :class="designMode">
    <section class="editor">
        <div class="url-parse-container" id="main">
        <iframe width="100%" height="100%" border="none" id="website-container-iframe-vue"></iframe>
        </div>
        <div class="assistant-container">
          <p><b>Select</b> related rules to element from <b>below Rules</b></p>
        </div>
        <div v-on:click="exitSelectMode()" class="editor-overlay"></div>
    </section>
    <aside class="sidebar">
      <div class="aside-title">
        <div class="checklist-container instant-view-steps">
          <h3 class="h-default"><b>Instant View</b> Checklist</h3>
          <h3 class="h-select"><b>Select</b> Instant View Rule</h3>
          <ul class="steps-container">
            <li class="format-type" id="indicator-article-body">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Article Body *</span>
            </li>
            <li class="format-type" id="indicator-title">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Title *</span>
            </li>
            <li class="format-type done" id="indicator-cover">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Cover</span>
            </li>
            <li class="format-type" id="indicator-subtitle">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Subtitle</span>
            </li>
            <li class="format-type" id="indicator-author">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Author</span>
            </li>
            <li class="format-type" id="indicator-published-dat">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Published Date</span>
            </li>
          </ul>
        </div>
        <div class="checklist-container link-preview-steps">
          <h3 class="h-default"><b>Link Preview</b> Checklist</h3>
          <h3 class="h-select"><b>Select</b> Link Preview Rule</h3>
          <ul class="steps-container">
            <li class="format-type" id="indicator-description">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Description</span>
            </li>
            <li class="format-type" id="indicator-image">
              <i class="checkmark-container"><i class="material-icons">check</i></i>
              <span>Image</span>
            </li>
          </ul>
        </div>
        <div class="actions-container">
          <div class="extra-actions">
            <h3 class="h-default"><b>Channel</b> Name</h3>
            <input type="text" name="channelName" placeholder="@username" value="">
            <hr>
          </div>
          <ul>
            <li><button v-on:click="showPreview" class="medium show-preview">SHOW PREVIEW</button></li>
            <li><button class="medium line submit-template">SUBMIT</button></li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="message-area">
      
    </div>
  </div>
</template>

<style lang="css">
  html,body{
    height:100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  /* --- ELEMENT STYLES --- */

  button{
    height: 42px;
    padding: 10px 16px;
    font-size: 15px;
    line-height: 1.33;
    border: none;
    outline: none;
    background-color: #1e98d4;
    color: #FFF;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: all .4s; 
    transition: all .4s;    
  }
  button.medium{
    height: 37px;
    font-size: 12px;
  }
  button:hover{
    background-color: #1ca5e8;
  }
  button:active{
    background-color: #2088bb;
  }
  button.line{
    background-color: transparent;
    color: #1e98d4;
    border: 1px solid #1e98d4;;
  }
  button.line:hover{
    color: #1ca5e8;
    border: 1px solid #1ca5e8;;
  }
  button.line:active{
    color: #2088bb;
    border: 1px solid #2088bb;;
  }



  input{
    height: 42px;
    padding: 10px 16px;
    font-size: 15px;
    line-height: 1.33;
    box-sizing: border-box;
    outline: none;
    box-shadow: none;
  }

  /* --- EDITOR STYLES --- */

  .url-parse-container{
    background-color : #efefef;
    height : calc(100% - 0px);
    overflow: scroll;
  }
  .editor{
    height : calc(100% - 160px);
    box-sizing : border-box;
    position: relative;
  }  
  .editor-overlay{
    background-color: rgba(0,0,0,.8);
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    display: none;
    -webkit-transition: all .2s; 
    transition: all .2s;    
  }
  .select-format .editor-overlay{
    display: block;
  }
  .assistant-container{
    width: 600px;
    text-align: center;
    background-color: #FFF;
    position: absolute;
    left: calc(50% - 300px);
    bottom: 50px;
    right: 0;
    z-index: 20;
    border-radius: 10px;
    display: none;
  }
  .assistant-container > p{
    font-weight: 300;
  }
  .select-format .assistant-container{
    display: block;
  }
  .h-select{
    display: none;
  }
  .select-format .h-select{
    display: block;
  }
  .select-format .h-default{
    display: none;
  }
  aside{
    height: 160px;
    padding : 0px;
    background-color: #FFF;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
    position : fixed;
    right:0;
    left: 0;
    bottom:0;
    z-index: 100;
  }
  aside h3{
    color: #232323;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
    padding-bottom: 15px;
    font-size: 14px;
    font-weight: 300;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.33;
    font-family: Lato;
  }
  .checklist-container{
    float: left;
    height: 160px;
  }
  .checklist-container > h3{
    border-bottom: 1px solid #1e98d4;
  }
  .extra-actions > h3{
    margin-bottom: 0px;
    margin-top: 0;
    padding-top: 30px;
    display: none;
  }
  .checklist-container.instant-view-steps{
    width: 50%;
  }
  .checklist-container.link-preview-steps{
    width: 20%;
  }
  .actions-container{
    width: calc(30% - 21px);
    margin-left: 20px;
    height: 160px;
    float: left;
    text-align: center;
    background-color: #f9f9f9;
    border-left: 1px solid #efefef;
  }
  .actions-container > ul{
    padding: 15px 0;
  }
  .actions-container > ul > li{
    float: left;
    width: calc(50% - 22px);
    padding-left: 15px;
  }
  .actions-container > ul > li > button{
    width: 100%;
  }
  .extra-actions{
    height: 95px
  }
  .extra-actions > hr{
    margin: 10px 15px;
    opacity: .15;
  }
  .extra-actions > input{
    width: calc(100% - 30px);
    margin: 15px;
    font-size: 14px;
    padding: 10px;
    line-height: 1.33;
    font-family: Lato;
  }
  .steps-container > li{
    height: 38px;
    float: left;
    margin: 0;
  }
  .select-format .steps-container > li{
    cursor: pointer;
  }

  .instant-view-steps .steps-container > li{
    width: calc(33% - 20px);
    margin-left: 20px;
  }
  .link-preview-steps .steps-container > li{
    width: calc(100% - 20px);
    margin-left: 20px;
  }
  .steps-container > li > span{
    display: inline-block;
    line-height: 38px;
    font-size: 13px;
    float:left;
    color: #cecece;
    font-family: Lato;
  }
  .steps-container > li > i{
    display: inline-block;
    font-size: 18px;
    line-height: 22px;
    float: left;
    width: 22px;
    height: 22px;
    border: 1px solid;
    margin-right: 10px;
    border-radius: 22px;
    text-align: center;
    margin-top: 8px;
    color: #dedede;
    -webkit-transition: all .2s; 
    transition: all .2s;    
  }
  .steps-container > li > i > i{
    display: inline-block;
    font-size: 18px;
    line-height: 22px;
    float: left;
    width: 22px;
    height: 22px;
    margin-right: 10px;
    text-align: center;
    color: #dedede;
    display: none;
    -webkit-transition: all .2s; 
    transition: all .2s;    
  }
  .select-fromat .steps-container > li:hover > span{
    color: rgba(30, 152, 212, 0.5);
  }
  .select-format .steps-container > li:hover > i{
    color: rgba(30, 152, 212, 0.5);
  }
  .select-format .steps-container > li:hover > i > i{
    display: block;
    color: rgba(30, 152, 212, 0.5);
  }

  .steps-container > li.done > span{
    color: #1e98d4;
  }
  .steps-container > li.done > i{
    color: #1e98d4;
  }
  .steps-container > li.done > i > i{
    display: block;
    color: #1e98d4;
  }
  #website-container-iframe-vue{
    width: 100% !important;
    height: 100% !important;
    border:none !important;
    max-width: 100% !important;
  }
</style>

<script type="text/javascript">

  import store from '../store';
  const request = require("browser-request");

  export default {

      name: 'EditorView',

      data: function(){
        return {
          name: null,
          url: null,
          html: null,
          designMode: ''
        }
      },
      watch:{
        designMode: function(val){
          this.designMode = val;
          return val;
        }

      },
      created() {
        this.url = 'http://1pezeshk.com/archives/2017/05/cambridge-librarian-reveals-the-fashion-used-to-be-for-spines-to-face-the-wall.html';
        var self = this;

        var domain = this.url.split('http://')[1].split('/')[0];

        request( window.api_url+'links/getHTML?url='+this.url , function(er, response, body) {
          if(!er){

            var el = document.createElement( 'div' );
            el.innerHTML = JSON.parse(body).html.body;


            var _base_url = 'http://'+domain, _head = '';

            if(JSON.parse(body).html['link-css']){
              for(var css in JSON.parse(body).html['link-css']){

                if(JSON.parse(body).html['link-css'][css].indexOf('http://')>-1 ||
                  JSON.parse(body).html['link-css'][css].indexOf('www.')>-1){
                  _base_url = '';
                }

                _head += '<link href="'+_base_url+JSON.parse(body).html['link-css'][css]+'" type="text/css" rel="stylesheet" media="all" />';
              }

            }

            if(JSON.parse(body).html['inline-css']){
              for(var css in JSON.parse(body).html['inline-css']){
                _head += '<style type="text/css">'+JSON.parse(body).html['inline-css'][css]+'</style>'
              }
            }

            _head += '<style type="text/css">.bordered-active-el{border: 5px solid #1565C0 !important;}</style>';

            //document.getElementById('main').innerHTML = el.innerHTML;
            var doc = document.getElementById('website-container-iframe-vue').contentWindow.document;
            doc.open();
            doc.write(_head+'<body class="'+JSON.parse(body).html.bodyClasses+'">'+el.innerHTML+'</body>');
            doc.close();

            setTimeout(function(){

              var formatTypes = document.querySelectorAll('.format-type')

              formatTypes.forEach(function(type) {
                type.addEventListener('click', self.selectFormat, true)
              });

              var iframe = document.getElementById('website-container-iframe-vue');
              var AllElements = iframe.contentWindow.document.querySelector('body').getElementsByTagName('*');
        
              for(var i = 0 ; i < AllElements.length ; i++){
             
                AllElements[i].addEventListener("mouseenter", function(e){
                    var elems = iframe.contentWindow.document.querySelector('body').getElementsByTagName('*');

                    [].forEach.call(elems, function(el) {
                        el.classList.remove("bordered-active-el");
                    });

                    e.target.classList.add('bordered-active-el');
                }, false);

                AllElements[i].addEventListener("mouseleave", function(e){
                  e.target.classList.remove('bordered-active-el');
                }, false);

                AllElements[i].addEventListener("click", function(e){
                  console.log('YAY');
                  if(e.target.nodeName == 'A')
                    e.preventDefault();
                  self.designMode = 'select-format';
                }, false);

              }
            },1000);


          } else{
             console.log('There was an error, but at least browser-request loaded and ran!')
              throw er 
          }


        })

      },
      mounted(){
      },
      methods: {
        showPreview(){

        },
        selectFormat(){
          console.log('Work');
        },
        exitSelectMode(){
          this.designMode = ''
        }


      }
  }

</script>