<template>
    <div class="container">

      <section class="cover-container">
        <img src="src/assets/img/instant.jpeg">
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
  body{
    font-family: 'Lato', sans-serif;
  }
  .container{
    width: 1170px;
    margin: 0 auto;
  }
  .cover-container{
    text-align: center;
  }
  .cover-container > img{
    width: 600px;
  }
  .form-container{
    width: 60%;
    margin : 0 auto;
    text-align: center;
  }
  .form-url{
  }
  .form-url input[type='text']{
    height: 42px;
    padding: 10px 16px;
    font-size: 15px;
    line-height: 1.33;
    width : calc(100% - 132px);
    box-sizing: border-box;
    outline: none;
    box-shadow: none;
  }
  .form-url input[type='submit']{
    padding: 10px 16px;
    font-size: 15px;
    line-height: 1.33;
    width : 70px;
  }
  .form-hint{
  }
  footer{
    text-align: center;
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