<template>
   <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<style lang="css">
  
</style>

<script type="text/javascript">

  const request = require("browser-request");
  import store from '../store';

  module.exports = {

      name: 'app',

      data: function(){
        return {
          loading: true,
        }
      },

      created(){
        
      },
      mounted: function(){
        
      },
      methods: {
 
      }
  }

</script>