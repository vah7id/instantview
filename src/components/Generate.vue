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
            <button v-on:click="start" class="medium line">open editor</button>

          </div>
        </div>

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
        start(){
          window.location.assign('#/editor?url=');
        }
      }
  }

</script>