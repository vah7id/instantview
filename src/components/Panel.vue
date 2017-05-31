<template>
    <div class="container">

     

    </div> <!-- container -->
</template>

<style lang="css">


</style>

<script type="text/javascript">

  import store from '../store';
  const request = require("browser-request");

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
      methods: {
        getItems(){

            request( window.api_url+'links' , function(er, response, body) {
              if(!er){

              }
            });
        }
      }
  }

</script>