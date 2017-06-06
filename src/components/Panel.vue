<template>
  <div>
    <div class="panel-karim">
      <h2>Domains Published</h2>
      <div class="container">
        <div v-for="item in items" class="domain-item">
            <h3>{{ item.domain }}</h3>
            <a :href="'http://telegram.me/'+item.telegram_id">{{ item.telegram_id }}</a>
            <button v-on:click="alert( item.template )">GET TEMPLATE CONTENT</button>
            <p>Sample URI : <a :href="item.url">{{ item.url }} </a></p>
            <small>Generated at : {{ item.created_at }}</small>
        </div>
      </div>
    </div> <!-- container -->
  </div>
</template>

<style lang="css">
.panel-karim h2{margin-top: 0;background: #222 !important;color:#fff;font-weight:bold !important;padding: 20px 65px;text-transform: uppercase;}
.domain-item{
  width: 100%;
  margin: 20px 0;
  float: left;
  position: relative;
  background-color: #eee;
}
.domain-item small{
  opacity: 0.5;
  font-size: 11px;
  margin: 10px 0 30px 15px;
  float: left;
}
.domain-item h3{
  font-weight: bold;
  padding: 5px 15px;
}
.domain-item button{
  margin-top:-40px;
  margin-right: 20px;
  float: right;
}
.domain-item p{
  width: 90%;
  margin: 10px 15px 5px 15px;
  float: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<script type="text/javascript">

  import store from '../store';
  const request = require("browser-request");
  const clipboard = require("clipboard-js");

  export default {

      name: 'PanelView',

      data: function(){
        return {
          name: null,
          items: []
        }
      },
      created() {
        this.getItems();
      },
      watch: {
        items: function(val){
          this.items = val;
          return val;
        }
      },
      methods: {
        getItems(){
            var self = this;
            request( window.api_url+'links' , function(er, response, body) {
              if(!er){
                self.items = JSON.parse(body);
              }
            });
        },
        copyToClipboard(text) {
            if (window.clipboardData && window.clipboardData.setData) {
                // IE specific code path to prevent textarea being shown while dialog is visible.
                return clipboardData.setData("Text", text); 

            } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                var textarea = document.createElement("textarea");
                textarea.textContent = text;
                textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                } catch (ex) {
                    console.warn("Copy to clipboard failed.", ex);
                    return false;
                } finally {
                    document.body.removeChild(textarea);
                }
            }
        },
        alert(txt){
          alert(txt);
          clipboard.copy({
            'text/plain': txt,
            'text/html': txt
          }).then(
            function(){console.log('success'); },
            function(err){console.log('failure', err);
          });
        }
      }
  }

</script>