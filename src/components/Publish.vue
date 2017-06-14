<template>
  <div>
    <div class="container">

      <section class="cover-container half-size">
        <img src="src/assets/img/publish.gif">
      </section> <!-- End cover-container -->

      <section class="form-container form-publish">
        <h1><b>Thank You!</b> We'll send the template to Telegram Team.</h1>
        <h4>For more updates please <b>enter your Telegram username</b> below.</h4>
        <div class="form-publish-control">
          <input type="text" name="telegramUsernme" id="telegramUsernameValue" placeholder="@username" value="">
          <button v-on:click="saveTelegramUsername" value="Save">LET ME KNOW</button>
          <p id="msg"></p>
        </div>
        <div class="back-to-home">
          <a  v-on:click="reload()">Create new template</a>
        </div>

          
      </section> <!-- End form-container -->

    </div> <!-- container -->    
  
  </div>
</template>

<script type="text/javascript">

  import store from '../store';
  const request = require("browser-request");

  export default {

      name: 'PublishView',

      data: function(){
        return {
          name: null
        }
      },
      created() {
        
      },
      methods: {
        reload(){
          window.location.assign('#/');
          window.location.reload();
        },
        saveTelegramUsername(){
           request( { method: 'PUT',url: window.api_url+'links/'+window.location.href.split('?id=')[1],json:{telegram_id: document.getElementById('telegramUsernameValue').value } } , function(er, response, body) {
            if(!er){
              document.getElementById('msg').innerHTML = 'Your Telegram Username Submited Successfully.'
            }
          });
        }
      }
  }

</script>