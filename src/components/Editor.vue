<template>
  <div>
    <section class="editor">
        <div class="url-parse-container" id="main">

        </div>
    </section>
    <aside class="sidebar">
      <div class="aside-title">
        <div class="checklist-container instant-view-steps">
          <h3><b>Instant View</b> Checklist</h3>
          <ul class="steps-container">
            <li class="indicator-article-body"><i class="material-icons">check</i><span>Article Body *</span></li>
            <li class="indicator-title"><i class="material-icons">check</i><span>Title *</span></li>
            <li class="indicator-cover done"><i class="material-icons">check</i><span>Cover</span></li>
            <li class="indicator-subtitle"><i class="material-icons">check</i><span>Subtitle</span></li>
            <li class="indicator-author"><i class="material-icons">check</i><span>Author</span></li>
            <li class="indicator-published-dat"><i class="material-icons">check</i><span>Published Date</span></li>
          </ul>
        </div>
        <div class="checklist-container link-preview-steps">
          <h3><b>Link Preview</b> Checklist</h3>
          <ul class="steps-container">
            <li class=""><i class="material-icons">check</i><span>Description</span></li>
            <li class=""><i class="material-icons">check</i><span>Image</span></li>
          </ul>
        </div>
        <div class="actions-container">
          <div class="extra-actions">
            <h3><b>Channel</b> Name</h3>
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

  /* --- EDITOR STYLES --- */

  .url-parse-container{
    background-color : #efefef;
    height : calc(100% - 0px);
    overflow: scroll;
  }
  aside{
    height: 160px;
    padding : 0px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
    position : fixed;
    right:0;
    left: 0;
    bottom:0;
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
  }
  .steps-container > li{
    height: 38px;
    float: left;
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
  .steps-container > li:hover > span{
    color: rgba(30, 152, 212, 0.5);
  }
  .steps-container > li:hover > i{
    color: rgba(30, 152, 212, 0.5);
  }
  .steps-container > li.done > span{
    color: #1e98d4;
  }
  .steps-container > li.done > i{
    color: #1e98d4;
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
          html: null
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
            document.getElementById('main').innerHTML = el.innerHTML;
            
            var _base_url = 'http://'+domain;


            if(JSON.parse(body).html['link-css']){
              for(var css in JSON.parse(body).html['link-css']){

                if(JSON.parse(body).html['link-css'][css].indexOf('http://')>-1 ||
                  JSON.parse(body).html['link-css'][css].indexOf('www.')>-1){
                  _base_url = '';
                }

                document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML + '<link href="'+_base_url+JSON.parse(body).html['link-css'][css]+'" type="text/css" rel="stylesheet" media="all" />';
              }

            }

            if(JSON.parse(body).html['inline-css']){
              for(var css in JSON.parse(body).html['inline-css']){
                document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML + '<style type="text/css">'+JSON.parse(body).html['inline-css'][css]+'</style>'
              }
            }

          }

          console.log('There was an error, but at least browser-request loaded and ran!')
          throw er
        })

      },
      mounted(){

      },
      methods: {
        showPreview(){

        }


      }
  }

</script>