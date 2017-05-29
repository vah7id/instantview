<template>
    <div class="container">

      <section class="cover-container">
        <img src="src/assets/img/instant.jpeg">
      </section> <!-- End cover-container -->

      <section class="form-container">
        <h1>Enter a URL to start create template</h1>
        <form class="form-url" method="post">
          <div class="form-url-control">
            <input type="text" name="url" placeholder="http://example.com/single-article" value="">
            <button type="submit" value="Start">Start</button>
          </div>
        </form>
      </section> <!-- End form-container -->

    </div> <!-- container -->
</template>

<style lang="css">

  /* --- GENERAL STYLES --- */

  html{
    height : 100%;
  }
  body{
    margin : 0;
    height : 100%;
    font-family: 'Lato', sans-serif;
    letter-spacing: 1px;  
  }
  body>div, body>div>div{
    height : 100%;
  }
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* --- PLACHOLDER STYLES --- */

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #bbb;
    letter-spacing: 1px;    
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #bbb;
    letter-spacing: 1px;    
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #bbb;
    letter-spacing: 1px;    
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #bbb;
    letter-spacing: 1px;    
  }  

  /* --- OVERRIDE STYLES --- */

  h1{
    font-weight: 300;
  }

  /* --- ELEMENT STYLES --- */

  button{
    height: 42px;
    padding: 10px 16px;
    font-size: 15px;
    line-height: 1.33;
    border: none;
    outline: none;
    background-color: #1e98d4;
    color: #FFF;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: all .4s; 
    transition: all .4s;    
  }
  button:hover{
    background-color: #1ca5e8;
  }
  button:active{
    background-color: #2088bb;
  }

  input{
    height: 42px;
    padding: 10px 16px;
    font-size: 15px;
    line-height: 1.33;
    box-sizing: border-box;
    outline: none;
    box-shadow: none;
  }

  /* --- LAYOUT STYLES --- */

  .container{
    width: 1170px;
    margin: 0 auto;
  }

  /* --- INDEX STYLES --- */

  .cover-container{
    text-align: center;
  }
  .cover-container > img{
    width: 400px;
    padding: 40px 0 40px 0;    
  }
  .form-container{
    width: 60%;
    margin : 0 auto;
    text-align: center;
    margin-bottom: 100px;    
  }
  .form-container h1{
    margin: 0 0 40px 0;
  }
  .form-url{
  }
  .form-url input{
    width : 100%;
  }
  .form-url-control{
    position: relative;
  }
  .form-url button{
    width: 100px;
    position: absolute;
    top: 0;
    right: 0;
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