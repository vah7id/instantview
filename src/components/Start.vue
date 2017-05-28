<template>
    <div class="container">

      <section class="cover-container">
      </section> <!-- End cover-container -->

      <section class="form-container">
        <form class="form-url" method="post">
          <input type="text" name="url" placeholder="http://example.com/single-article" value="">
          <input type="submit" value="Start">
        </form>
        <span class="form-hint">Enter a URL to create template</span>
      </section> <!-- End form-container -->

      <footer>
        <p>footer</p>
      </footer>

    </div> <!-- container -->
</template>

<style lang="css">
  .container{
    width : 1170px;
    margin: 0 auto;
  }
  .cover-container{
    background-color : #cecece;
    width: 100%;
    height: 300px;
  }
  .form-container{
  }
  .form-url{
  }
  .form-url input[type='text']{
  }
  .form-url input[type='submit']{
  }
  .form-hint{
  }

</style>

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

      }
  }

</script>