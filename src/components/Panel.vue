<template>
  <div>
    <div class="panel-karim">
      <h2>Domains Published</h2>
      <div class="container">
        <div v-for="item in items" class="domain-item">
            <h3>{{ item.domain }}</h3>
            <p>Sample URI : <a :href="item.url">{{ item.url }} </a></p>
            <button v-on:click="alert( item.template )">GET TEMPLATE CONTENT</button>
            <small>Generated at : {{ item.created_at }}</small>
        </div>
      </div>
    </div> <!-- container -->
  </div>
</template>

<style lang="css">
.panel-karim h2{margin-top: 0;background: #222 !important;color:#fff;font-weight:bold !important;padding: 20px 65px;text-transform: uppercase;}
.domain-item{
  width: 25%;
  float: left;
  background-color: #eee;
  border: 10px solid #fff;
}
.domain-item small{
  opacity: 0.5;
  font-size: 11px;
  margin: 10px 0 30px 15px;
  float: left;
}
.domain-item h3{
  padding: 5px 15px;
}
.domain-item button{
  margin-bottom: 10px;
  margin-left: 14px;
}
.domain-item p{
  width: 85%;
  margin: 20px auto;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
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
      watch: {
        items: function(val){
          this.items = val;
          return val;
        }
      },
      methods: {
        getItems(){
            var self = this;
            request( window.api_url+'links' , function(er, response, body) {
              if(!er){
                self.items = JSON.parse(body);
              }
            });
        },
        alert(txt){
          alert(txt)
        }
      }
  }

</script>