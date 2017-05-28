<template>
  <div>
    <section class="editor">
        <div class="url-parse-container">

        </div>
    </section>
    <aside>
      <div class="aside-title">
        <h3>Checklist</h3>
        <ul>
          <li><span>One</span></li>
          <li><span>Two</span></li>
          <li><span>Three</span></li>
          <li><span>Four</span></li>
          <li><span>Five</span></li>
          <li><span>Six</span></li>
          <li><span>Seven</span></li>
          <li><span>Eight</span></li>
          <li><span>Nine</span></li>
          <li><span>Ten</span></li>
        </ul>
        <div class="actions-container">
          <ul>
            <li><span>Show Preview</span></li>
            <li><span>Create Template</span></li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<style lang="css">

  /* --- EDITOR STYLES --- */

  .editor{
    width : calc(100% - 340px);
    height : 100%;
    box-sizing : border-box;
  }
  .url-parse-container{
    background-color : #efefef;
    height : calc(100% - 0px);
  }
  aside{
    width : 300px;
    padding : 20px;
    position : fixed;
    right:0;
    top:0;
    bottom:0;
  }
  .actions-container{
    position : absolute;
    bottom:0;
  }

</style>

<script type="text/javascript">

  import store from '../store';

  export default {

      name: 'EditorView',

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