<template>
  <div>
    <div :class="designMode">
      <section class="editor">
          <div class="url-parse-container" id="main">
          <iframe width="100%" height="100%" border="none" id="website-container-iframe-vue"></iframe>
          </div>
          <div class="assistant-container">
            <p><b>Select</b> related rules to element from <b>below Rules</b></p>
          </div>
          <div v-on:click="exitSelectMode()" class="editor-overlay"></div>
      </section>
      <aside class="sidebar">
        <div class="aside-title">
          <div class="checklist-container instant-view-steps">
            <h3 class="h-default"><b>Instant View</b> Checklist</h3>
            <h3 class="h-select"><b>Select</b> Instant View Rule</h3>
            <ul class="steps-container">
              <li class="format-type" id="indicator-body">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Article Body *</span>
              </li>
              <li class="format-type" id="indicator-title">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Title *</span>
              </li>
              <li class="format-type" id="indicator-cover">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Cover</span>
              </li>
              <li class="format-type" id="indicator-subtitle">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Subtitle</span>
              </li>
              <li class="format-type" id="indicator-author">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Author</span>
              </li>
              <li class="format-type" id="indicator-published_date">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Published Date</span>
              </li>
            </ul>
          </div>
          <div class="checklist-container link-preview-steps">
            <h3 class="h-default"><b>Link Preview</b> Checklist</h3>
            <h3 class="h-select"><b>Select</b> Link Preview Rule</h3>
            <ul class="steps-container">
              <li class="format-type" id="indicator-description">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Description</span>
              </li>
              <li class="format-type" id="indicator-image_url">
                <i class="checkmark-container"><i class="material-icons">check</i></i>
                <span>Image</span>
              </li>
            </ul>
          </div>
          <div class="actions-container">
            <div class="extra-actions">
              <h3 class="h-default"><b>Channel</b> Name</h3>
              <input type="text" name="channelName" placeholder="@username" value="">
              <hr>
            </div>
            <ul>
              <li><button v-on:click="showPreview" class="medium show-preview">SHOW PREVIEW</button></li>
              <li><button class="medium line submit-template" v-on:click="publish">PUBLISH</button></li>
            </ul>
          </div>
        </div>
      </aside>
      <div class="message-area">
        
      </div>
    </div>
  </div>
</template>


<script type="text/javascript">

  import store from '../store';
  const request = require("browser-request");

  export default {

      name: 'EditorView',

      data: function(){
        return {
          name: null,
          url: null,
          html: null,
          designMode: '',
          current_selected: null,
          types: [],
          rules: null
        }
      },
      watch:{
        designMode: function(val){
          this.designMode = val;
          return val;
        }

      },
      created() {
        console.log('inja')
        this.url = decodeURIComponent(window.location.href.split('?url=')[1]);
        var self = this;
        var domain = this.url.split('http://')[1].split('/')[0];
        
        request( window.api_url+'links/getHTML?url='+this.url , function(er, response, body) {
          if(!er){

            var el = document.createElement( 'div' );

            el.innerHTML = JSON.parse(body).html.body;

            var _base_url = 'http://'+domain, _head = '';

            if(JSON.parse(body).html['link-css']){
              for(var css in JSON.parse(body).html['link-css']){

                if(JSON.parse(body).html['link-css'][css].indexOf('http://')>-1 ||
                  JSON.parse(body).html['link-css'][css].indexOf('www.')>-1){
                  _base_url = '';
                }

                _head += '<link href="'+_base_url+JSON.parse(body).html['link-css'][css]+'" type="text/css" rel="stylesheet" media="all" />';
              }

            }

            if(JSON.parse(body).html['inline-css']){
              for(var css in JSON.parse(body).html['inline-css']){
                _head += '<style type="text/css">'+JSON.parse(body).html['inline-css'][css]+'</style>'
              }
            }

            _head += '<style type="text/css">.remove-selected{float: left;width: 26px;margin-right: 20px;text-align: center;line-height: 25px;background-color: rgba(0, 0, 0, .1);text-transform: lowercase;font-size: 16px;}.bordered-selected-el{border:1px solid #1ca5e8;} .bordered-active-el{box-shadow: 0px 0px 15px rgba(30, 152, 212, 0.6) !important;border:1px solid #1ca5e8;box-sizing: border-box; !important}.label-type{background-color: rgba(30, 152, 212, 0.9); color : #FFF; padding-right:20px; position: absolute;z-index: 10002;    font-family: sans-serif;text-transform: uppercase;font-size: 12px;letter-spacing: 2px;}</style>';

            //document.getElementById('main').innerHTML = el.innerHTML;
            var doc = document.getElementById('website-container-iframe-vue').contentWindow.document;
            doc.open();
            doc.write(_head+'<body class="'+JSON.parse(body).html.bodyClasses+'">'+el.innerHTML+'</body>');
            doc.close();

            setTimeout(function(){
              self.setEvents();
            },1000);


          } else{
             console.log('There was an error, but at least browser-request loaded and ran!')
              throw er 
          }


        })

      },
      mounted(){
      },
      methods: {
        showPreview(){

        },
        selectFormat(e){
          
          if(this.designMode == 'select-format'){

              var type;

              if(e.target.nodeName=='I' || e.target.nodeName=="SPAN"){
                type = e.target.parentNode.getAttribute('id');
                e.target.parentNode.classList.add('done')
              } else{
                e.target.classList.add('done')
                type =  e.target.getAttribute('id');
              }

              type = type.split('indicator-')[1];

              this.current_selected.classList.add('bordered-selected-el');
              this.current_selected.setAttribute('id','bordered-selected-'+type);

              this.types[type] = this.current_selected;
              var tmp = document.createElement('DIV');
              tmp.classList.add('label-type-'+type);
              tmp.classList.add('label-type');

              tmp.innerHTML = '<span class="remove-selected">X</span>'+type;
              tmp.style.left = this.cumulativeOffset(this.current_selected).left + 'px';
              tmp.style.top  = this.cumulativeOffset(this.current_selected).top - 26 + 'px';

              var iframe_content = document.querySelector('#website-container-iframe-vue').contentWindow.document.querySelector('body').innerHTML;

              var iframe_tmp = document.querySelector('#website-container-iframe-vue').contentWindow.document.querySelector('body')

              var self = this;
              iframe_tmp.innerHTML = iframe_content+tmp.outerHTML;
              iframe_tmp.querySelector('.label-type-'+type +' .remove-selected').addEventListener('click',function(){self.removeLabel(type)},false);



              this.setEvents();
              this.designMode = '';

            }

        },

        removeLabel(type){
          var iframe_tmp = document.getElementById('website-container-iframe-vue').contentWindow.document.querySelector('body');
         
          document.getElementById('website-container-iframe-vue').contentWindow.document.getElementById('bordered-selected-' + type).classList.remove('bordered-selected-el');
          iframe_tmp.querySelector('.label-type-'+ type).remove();
          this.designMode = '';
        },

        exitSelectMode(){
          this.designMode = ''
        },

        publish(){
          this.rules = '';
          this.rules = '$body://body \n';
          this.rules += '?exist: $body \n';
          //title

          var self = this;

          var iframe = document.getElementById('website-container-iframe-vue').contentWindow.document.querySelector('body');

          if(!this.types['title'] || !this.types['body']){
            alert('title and body is required');
            return false;
          }
     
          for(var type_item in this.types){
             
              var title_confirm = false;
              if(this.types[type_item].getAttribute('id') != null){
                this.rules += type_item+': //'+this.types[type_item].nodeName.toLowerCase()+'[@id="'+this.types[type_item].getAttribute('id')+'"]'+'\n';
                title_confirm = true;
              } else{

                if(this.types[type_item].classList != null && this.types[type_item].classList != ''){
                  if( iframe.querySelectorAll( this.classMaker(this.types[type_item].classList) ).length == 1 ){
                      this.rules += type_item+': //'+this.types[type_item].nodeName.toLowerCase()+'[@class="'+this.types[type_item].classList+'"]'+'\n';
                    title_confirm = true;
                  }
                }
              }


              if(!title_confirm){

                var title_parent = this.types[type_item];

                do{
                  title_parent = title_parent.parentNode;

                  if(title_parent.getAttribute('id') != null){
                    this.rules += type_item+': //'+title_parent.nodeName.toLowerCase()+'[@id="'+title_parent.getAttribute('id')+'"]//'+this.types[type_item].nodeName.toLowerCase()+'\n';
                    title_confirm = true;

                  } else{

                    if(title_parent.classList != null && title_parent.classList != ''){
                      if( .length == 1 ){
                        this.rules += type_item+': //'+title_parent.nodeName.toLowerCase()+'[@class="'+title_parent.classList+'"]//'+this.types[type_item].nodeName.toLowerCase()+'\n';
                        title_confirm = true;
                      }
                    }

                  }

                  if( iframe.querySelectorAll(title_parent.nodeName+' '+this.types[type_item].nodeName).length == 1 ){
                      this.rules += type_item+': //  '+title_parent.nodeName.toLowerCase()+'//'+this.types[type_item].nodeName.toLowerCase()+'\n';
                      title_confirm = true;
                    }

                  if(type_item == 'image_url')
                    this.rules += '/@src';

                } while(!title_confirm)

              }


              console.log(this.rules)

          }

        },

        cumulativeOffset(element) {
            var top = 0, left = 0;
            do {
                top += element.offsetTop  || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while(element);

            return {
                top: top,
                left: left
            };
        },
        setEvents(){

            var self = this;
            var formatTypes = document.querySelectorAll('.format-type')

            formatTypes.forEach(function(type) {
              type.addEventListener('click', self.selectFormat, true)
            });

            var iframe = document.getElementById('website-container-iframe-vue');
            var AllElements = iframe.contentWindow.document.querySelector('body').getElementsByTagName('*');
      
            for(var i = 0 ; i < AllElements.length ; i++){
           
              AllElements[i].addEventListener("mouseenter", function(e){
                  var elems = iframe.contentWindow.document.querySelector('body').getElementsByTagName('*');

                  [].forEach.call(elems, function(el) {
                      el.classList.remove("bordered-active-el");
                  });

                  e.target.classList.add('bordered-active-el');
              }, false);

              AllElements[i].addEventListener("mouseleave", function(e){
                e.target.classList.remove('bordered-active-el');
              }, false);

              AllElements[i].addEventListener("click", function(e){
                if(e.target.nodeName == 'A')
                  e.preventDefault();

                if(!e.target.classList.contains('bordered-selected-el') && !e.target.classList.contains('label-type'))
                  self.designMode = 'select-format';

                self.current_selected = e.target;

              }, false);

          }

        },
        classMaker(classList){
          var classes = classList.toString();
          if( typeof classes.split(' ') != "undefined"){
            for(var i = 0 ; i < classes.split(' ').length ; i++)
              classes = classes.replace(' ','.');
          }
          
          return '.'+classes;
        }

      }
  }

</script>