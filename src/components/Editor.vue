<template>
  <div>
    <section class="editor">
        <div id="main" class="url-parse-container">
          
        </div>
    </section>
    <aside>
      <div class="aside-title">
        <h3>Checklist</h3>
        <ul>
          <li><span>One</span></li>
          <li><span>Two</span></li>
          <li><span>Three</span></li>
          <li><span>Four</span></li>
          <li><span>Five</span></li>
          <li><span>Six</span></li>
          <li><span>Seven</span></li>
          <li><span>Eight</span></li>
          <li><span>Nine</span></li>
          <li><span>Ten</span></li>
        </ul>
        <div class="actions-container">
          <ul>
            <li><span>Show Preview</span></li>
            <li><span>Create Template</span></li>
          </ul>
        </div>
      </div>
    </aside>
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

  .editor{
    width : calc(100%);
    height : 100%;
    float: left;
    box-sizing : border-box;
  }
  .url-parse-container{
    background-color : #efefef;
    height : calc(100% - 0px);
  }
  aside{
    width : 300px;
    padding : 20px;
    position : fixed;
    right:0;
    top:0;
    bottom:0;
  }
  .actions-container{
    position : absolute;
    bottom:0;
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
        this.url = 'http://www.bama.ir/car/details-2-2431689/2008-bmw-x3-25-for-sale';
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
      methods: {

      }
  }

</script>