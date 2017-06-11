<template>
  <div>
    <div class="container">

        <div class="analyzing-loading">
          <div class="analyzing-container">
            <img src="src/assets/img/analyze-layout.png">
            <div><div><i class="material-icons">search</i></div></div>          
          </div>
          <div class="analyzing-actions">
            <p>Analyzing the content to find key parts of the article...</p>
            <div id="cannot_fetch" style="display:none">
              <p id="message">{{ message }}</p>
              <button class="medium line" v-on:click="openEditor">open editor</button>
              <button class="medium line submit" v-on:click="submit">Submit Template</button>
            </div>
          </div>
        </div>

    </div> <!-- container -->    
  
  </div>
</template>

<script type="text/javascript">

  import store from '../store';
  const request = require("browser-request");

  export default {

      name: 'GenerateView',

      data: function(){
        return {
          name: null,
          url: null,
          message: '',
          rules: null
        }
      },
      watch:{
        url: function(val){
          this.url = val;
          this.startCrawl();
          return val;
        },
        rules: function(val){
          this.rules = val;
          return val;
        },
        $route: function(val){
          this.startCrawl();
          this.message = '';
        }
      },
      created() {
        this.startCrawl();
      },
      methods: {
        openEditor(){
          window.location.assign('#/editor?url='+this.url);
        },
        submit(){
        
          this.url = decodeURIComponent(this.url);
          
          var domain = '';
          if(this.url.indexOf('https')>-1)
            domain = this.url.split('https://')[1].split('/')[0];
          else
            domain = this.url.split('http://')[1].split('/')[0];


           request( {url: window.api_url+'links',method:'POST',
            json:{
                'domain':domain,
                'url': this.url,
                'template' : this.rules,
                'created_at': new Date()
              }
            },function(er, response, body) {
              if(!er){
                window.location.assign('#/publish?id='+body.id);
              }
          });

        },
        startCrawl(){
          
          this.url = window.location.href.split('?url=')[1];
          var self = this;
          this.message = '';

          if(this.url != null){
            console.log(this.url)
            var self = this;
              
            request( window.api_url+'links/generateTpl?url='+this.url , function(er, response, body) {
              document.getElementById('cannot_fetch').style.display = 'none'; 

              if(!er){
                var res = JSON.parse(body);
                document.getElementById('cannot_fetch').style.display = 'block'; 
                self.rules = res.html.tpl;

                if( JSON.parse(body).html.checklist.body == false ){
                  self.message = 'Cannot fetch data from template of html. Please trying manually option with editor.';
                } else{
                  var ready = [];
                  for(var item in res.html.checklist){
                    if( res.html.checklist[item] == true)
                      ready.push(item);
                  }

                  self.message = 'Template generated with " '+ready.toString()+' " format types. If you need more tags in your template Please trying manually option with editor.';
                }


              }
            });
          }
        }
      }
  }

</script>