<template>
    <div class="container">
        
        <section class="cover-container">
          <img src="src/assets/img/instant.jpeg">
        </section> <!-- End cover-container -->

        <section class="form-container form-url">
          <h1>Enter a sample <b>article URL</b> to <b>instant view ready</b> your website links.</h1>
          <div class="form-url-control">
            <input v-on:keyup="inputUrl" type="text" name="url" id="url-value" placeholder="http://example.com/single-article/:title" value="">
            <button v-on:click="start" class="medium disabled open-editor" value="Start">Open Editor</button>
            <button v-on:click="startGenerate" class="medium disabled line auto-generate" value="Start">Auto Generate</button>
          </div>
          <div class="middle-links">
            <ul>
              <li><a href="https://github.com/vah7id/instantview">GitHub</a></li>
              <li><a href="https://instantview.telegram.org/docs">Manual</a></li>
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
          name: null,
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
          if(document.getElementById('url-value').value)
            window.location.assign('#/editor?url='+document.getElementById('url-value').value);
        },
        startGenerate(){
          if(document.getElementById('url-value').value)
            window.location.assign('#/generate?url='+document.getElementById('url-value').value);
        },
        inputUrl(){
          if(document.getElementById('url-value').value){
            document.querySelector('.form-url-control button.open-editor').classList.remove('disabled');
            document.querySelector('.form-url-control button.auto-generate').classList.remove('disabled');
          }
          else{
            document.querySelector('.form-url-control button.open-editor').classList.add('disabled');
            document.querySelector('.form-url-control button.auto-generate').classList.add('disabled');
          }

        }

      }
  }

</script>
