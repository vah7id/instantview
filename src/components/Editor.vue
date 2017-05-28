<template>
  <div>
<<<<<<< HEAD
  
  <div class="sidebar">

  </div>

  <div id="main">

  </div>
=======
    <section class="editor">
        <div class="url-parse-container">
>>>>>>> 625513bfa93b5cead814e733348c85640c179c58

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
  .main{
    width: 100%;
    height: 100%;
  }

  /* --- EDITOR STYLES --- */

  .editor{
    width : calc(100% - 340px);
    height : 100%;
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