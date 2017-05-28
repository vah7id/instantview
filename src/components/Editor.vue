<template>
  <div>
  
  <div class="sidebar">

  </div>

  <div id="main">

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
.main{
  width: 100%;
  height: 100%;
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
        this.url = 'http://digiato.com/article/2017/05/28/%D8%AA%D9%84%D9%81%DB%8C%D9%82-%D8%AF%D9%86%DB%8C%D8%A7%DB%8C-%D8%A2%D9%86%D8%A7%D9%84%D9%88%DA%AF-%D9%88-%D8%AF%DB%8C%D8%AC%DB%8C%D8%AA%D8%A7%D9%84-%D8%AF%D8%B1-%D8%A7%D8%B3%DA%A9%D9%88%D8%AA%D8%B1/';
        var self = this;

        request( window.api_url+'links/getHTML?url='+this.url , function(er, response, body) {
          if(!er){
            console.log(body)
          }

          console.log('There was an error, but at least browser-request loaded and ran!')
          throw er
        })

      },
      methods: {

      }
  }

</script>