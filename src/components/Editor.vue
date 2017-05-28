<template>
  <div>
    <section class="editor">
        <div class="url-parse-container">
        </div>
    </section>
    <aside>
      <div class="aside-title">
        <div class="checklist-container instant-view-steps">
          <h3><b>Instant View</b> Checklist</h3>
          <ul class="steps-container">
            <li class="indicator-article-body"><i class="material-icons">check</i><span>Article Body</span></li>
            <li class="indicator-title"><i class="material-icons">check</i><span>Title</span></li>
            <li class="indicator-cover done"><i class="material-icons">check</i><span>Cover</span></li>
            <li class="indicator-subtitle"><i class="material-icons">check</i><span>Subtitle</span></li>
            <li class="indicator-author"><i class="material-icons">check</i><span>Author</span></li>
            <li class="indicator-published-dat"><i class="material-icons">check</i><span>Published Date</span></li>
          </ul>
        </div>
        <div class="checklist-container link-preview-steps">
          <h3><b>Link Preview</b> Checklist</h3>
          <ul class="steps-container">
            <li class=""><i class="material-icons">check</i><span>Description</span></li>
            <li class=""><i class="material-icons">check</i><span>Image</span></li>
          </ul>
        </div>
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
    height : calc(100% - 200px);
    box-sizing : border-box;
  }
  .url-parse-container{
    background-color : #efefef;
    height : calc(100% - 0px);
    overflow: scroll;
  }
  aside{
    height: 200px;
    padding : 0px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
    position : fixed;
    right:0;
    left: 0;
    bottom:0;
  }
  .actions-container{
    position : absolute;
    bottom:0;
    right: 0;
  }
  .checklist-container{
    float: left;
  }
  .checklist-container h3{
    color: #232323;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
    padding-bottom: 15px;
    font-size: 14px;
    font-weight: 300;
    border-bottom: 1px solid #1e98d4;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .checklist-container.instant-view-steps{
    width: 50%;
  }
  .checklist-container.link-preview-steps{
    width: 25%;
  }
  .steps-container{
  }
  .steps-container > li{
    height: 38px;
    float: left;
    cursor: pointer;
  }

  .instant-view-steps .steps-container > li{
    width: calc(50% - 20px);
    margin-left: 20px;
  }
  .link-preview-steps .steps-container > li{
    width: calc(100% - 20px);
    margin-left: 20px;
  }
  .steps-container > li > span{
    display: inline-block;
    line-height: 38px;
    font-size: 13px;
    float:left;
    color: #cecece;
  }
  .steps-container > li > i{
    display: inline-block;
    font-size: 18px;
    line-height: 22px;
    float: left;
    width: 22px;
    height: 22px;
    border: 1px solid;
    margin-right: 10px;
    border-radius: 22px;
    text-align: center;
    margin-top: 8px;
    color: #dedede;
    -webkit-transition: all .2s; 
    transition: all .2s;    
  }
  .steps-container > li:hover > span{
    color: rgba(30, 152, 212, 0.5);
  }
  .steps-container > li:hover > i{
    color: rgba(30, 152, 212, 0.5);
  }
  .steps-container > li.done > span{
    color: #1e98d4;
  }
  .steps-container > li.done > i{
    color: #1e98d4;
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