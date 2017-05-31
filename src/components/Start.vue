<template>
    <div class="container">

      <section class="cover-container">
        <img src="src/assets/img/instant.jpeg">
      </section> <!-- End cover-container -->

      <section class="form-container form-url">
        <h1>Enter a sample <b>article URL</b> to <b>instant view ready</b> your website links.</h1>
        <div class="form-url-control">
          <input type="text" name="url" id="url-value" placeholder="http://example.com/single-article/:title" value="">
          <button v-on:click="start" value="Start">DO MAGIC</button>
        </div>
      </section> <!-- End form-container -->

    </div> <!-- container -->
</template>

<script type="text/javascript">

  import store from '../store';

  export default {

      name: 'StartView',

      data: function(){
        return {
          name: null
        }
      },
      created() {
        
      },
      methods: {
        start(){
          window.location.assign('#/editor?url='+document.getElementById('url-value').value);
        }
      }
  }

</script>