<template>
    <div class="container">
        
        <section class="cover-container">
          <img src="src/assets/img/instant.jpeg">
        </section> <!-- End cover-container -->

        <section class="form-container form-url">
          <h1>Enter a sample <b>article URL</b> to <b>instant view ready</b> your website links.</h1>
          <div class="form-url-control">
            <input type="text" name="url" id="url-value" placeholder="http://example.com/single-article/:title" value="">
            <button v-on:click="start" class="medium" value="Start">Open Editor</button>
            <button v-on:click="startGenerate" class="medium line" value="Start">Auto Generate</button>
          </div>
          <div class="middle-links">
            <ul>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Manual</a></li>
              <li><a href="https://telegram.org/blog/instant-view">What is Instant View?</a></li>
            </ul>
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
        },
        startGenerate(){
          window.location.assign('#/generate?url='+document.getElementById('url-value').value);
        }

      }
  }

</script>