<template>
  <div>
    <div :class="designMode">
      <section class="editor">
          <div class="url-parse-container" id="main">
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
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
                <span>Subtitle / Lead</span>
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
          <!--
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
        -->
          <div class="actions-container">
            <div class="extra-actions">
              <h3 class="h-default"><b>Channel</b> Name</h3>
              <input type="text" name="channelName" placeholder="@username" value="">
              <hr>
            </div>
            <ul>
              <li><button v-on:click="showPreview" class="medium show-preview">PREVIEW</button></li>
              <li><button class="medium line submit-template" v-on:click="publish">PUBLISH</button></li>
            </ul>
          </div>
        </div>
      </aside>
      <div class="preview-page-container">
        <span class="close-preview-page"><i v-on:click="closePreview" class="material-icons">close</i></span>
        <span class="page-title">
          <h3>Preview</h3>
        </span>
        <div class="preview-container">
          <div class="marvel-device nexus5">
              <div class="top-bar"></div>
              <div class="sleep"></div>
              <div class="volume"></div>
              <div class="camera"></div>
              <div class="screen">
                <div class="preview-frame">
                  <article>

                    <figure data-block="Cover" v-if="preview_data['cover']">
                      <img v-bind:src="preview_data['cover']">
                    </figure>
                    <figure data-block="Cover" v-if="analyseSelected('cover')">
                      <div class="placeholder-img">Cover not selected</div>
                    </figure>

                    <h1 data-block="Title" v-if="preview_data['title']">{{ preview_data['title'] }}</h1>
                    <h1 data-block="Title" class="placeholder-color" v-if="analyseSelected('title')">Page title NOT seleceted</h1>

                    <h5 data-block="Subtitle" v-if="preview_data['subtitle']">{{ preview_data['subtitle'] }}</h5>
                    <h5 data-block="Subtitle" class="placeholder-color" v-if="analyseSelected('subtitle')">Page Subtitle NOT seleceted</h5>

                    <address data-block="Date, Author">
                      <time v-if="preview_data['published_date']">{{ preview_data['published_date'] }}</time>
                      <time class="placeholder-color" v-if="analyseSelected('published_date')">Date NOT seleceted</time>
                      by
                      <a rel="author" v-if="preview_data['author']">{{ preview_data['author'] }}</a>
                      <a rel="author" class="placeholder-color" v-if="analyseSelected('author')">Author NOT seleceted</a>
                    </address>
                    <div class="preview-article-body" v-if="preview_data['body']" v-html="preview_data['body']"></div> 
                    <div class="preview-article-body" v-if="analyseSelected('body')">
                      <p class="placeholder-color" data-block="Paragraph">Article body NOT seleceted</p>
                    </div> 
                  </article>
                </div>

              </div>
          </div>        
        </div>
        <div class="preview-actions">
        </div>
      </div>
      <div v-on:click="closeModal" class="modal-page-container">
        <span class="close-modal-page"><i v-on:click="closeModal" class="material-icons">close</i></span>
        <div class="modal-container">
          <div class="modal-window">
            <div class="modal-header">
              <h4>{{ modalTitle }}</h4>
            </div>
            <div class="modal-body">
              <p>{{ modalMessage }}</p>
            </div>
            <div class="modal-footer">
              <a v-on:click="closeModal">OK</a>
            </div>
          </div>
        </div>
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
          modalMessage: '',
          modalTitle: '',
          current_selected: null,
          types: [],
          rules: null,
          preview_data: [],
          preview_selected: []
        }
      },
      watch:{
        designMode: function(val){
          this.designMode = val;
          return val;
        },
        url: function(val){
          this.url = val;
          this.startCrawl();
          return val;
        },
        types: function(val){
          this.types = val;
          this.getPreviewData();
        },
        preview_data: function(val){
          this.preview_data = val;
          return val;
        },
        $route: function(val){
          this.startCrawl();
        }
      },
      created() {
        this.startCrawl();
      },
      mounted(){
      },
      methods: {

        showPreview(){
          this.getPreviewData();
        },
        startCrawl(){

            this.url = decodeURIComponent(window.location.href.split('?url=')[1]);
            var self = this;
           
            var domain = '';
            if(this.url.indexOf('https')>-1)
              domain = this.url.split('https://')[1].split('/')[0];
            else
              domain = this.url.split('http://')[1].split('/')[0];
              

            request( window.api_url+'links/getHTML?url='+this.url , function(er, response, body) {
              if(!er){

                var el = document.createElement( 'div' );

                el.innerHTML = JSON.parse(body).html.body;

                var images = el.getElementsByTagName('img');

                for(var i = 0 ; i < images.length ; i++){

                  var src = images[i].getAttribute('src');
                  
                  if(src != null ){
                    
                    if(src.indexOf('http://')<0 && src.indexOf('https://')<0){

                      if( self.url.indexOf('http://')>-1 ){
                        images[i].setAttribute('src','http://'+domain+'/'+src);
                      }
                      else if( self.url.indexOf('https://')>-1 ){
                        images[i].setAttribute('src','https://'+domain+'/'+src);
                      }

                    }

                  }

                }

                var portocol  = self.url.indexOf('http://')>-1 ? 'http://' : 'https://';
                var _base_url = portocol+domain, _head = '';

                if(JSON.parse(body).html['link-css']){
                  for(var css in JSON.parse(body).html['link-css']){

                    if(JSON.parse(body).html['link-css'][css].indexOf('http://')>-1 ||
                      JSON.parse(body).html['link-css'][css].indexOf('www.')>-1 || 
                      JSON.parse(body).html['link-css'][css].indexOf('https://')>-1){
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

                _head += '<style type="text/css">.bordered-selected-el{border:1px solid #1ca5e8;} .bordered-active-el{box-shadow: 0px 0px 15px rgba(30, 152, 212, 0.6) !important;border:1px solid #1ca5e8;box-sizing: border-box; !important}.label-type{background-color: rgba(30, 152, 212, 0.9); color : #FFF; padding-right:20px; position: absolute;z-index: 10002;font-family: sans-serif;text-transform: uppercase;font-size: 12px;letter-spacing: 2px;box-shadow: none !important; border: none !important;line-height: 26px;} .remove-selected{float: left;width: 26px;margin-right: 20px;text-align: center;line-height: 25px;background-color: rgba(0, 0, 0, .1);text-transform: lowercase;font-size: 16px; box-shadow: none !important; border: none !important; cursor: pointer;}</style>';

                //document.getElementById('main').innerHTML = el.innerHTML;
                var doc = document.getElementById('website-container-iframe-vue').contentWindow.document;
                doc.open();
                doc.write(_head+'<body class="'+JSON.parse(body).html.bodyClasses+'">'+el.innerHTML+'</body>');
                doc.close();

                setTimeout(function(){
                  self.setEvents();
                  document.querySelector('.spinner').style.display = 'none';
                },1000);


              } else{
                 console.log('There was an error, but at least browser-request loaded and ran!')
                  throw er 
              }


            })
        },
        showModal(title, message){
          this.modalTitle= title;
          this.modalMessage = message;
          this.designMode = 'modal-mode';
        },
        closePreview(){
          this.designMode = '';
        },
        closeModal(){
          this.designMode = '';
        },
        selectFormat(e){
          
          if(this.designMode == 'select-format'){

              var type;

              if(e.target.nodeName=='I' || e.target.nodeName=="SPAN"){
                type = e.target.closest("li").getAttribute('id');
                e.target.closest("li").classList.add('done')
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
              tmp.setAttribute('data',type);
              tmp.innerHTML = '<span class="remove-selected">X</span>'+type;
              tmp.style.left = this.cumulativeOffset(this.current_selected).left + 'px';
              tmp.style.top  = this.cumulativeOffset(this.current_selected).top - 26 + 'px';

              var iframe_content = document.querySelector('#website-container-iframe-vue').contentWindow.document.querySelector('body').innerHTML;

              var iframe_tmp = document.querySelector('#website-container-iframe-vue').contentWindow.document.querySelector('body')

              var self = this;
              iframe_tmp.innerHTML = iframe_content+tmp.outerHTML;
              
              this.setRemoveLabelEvents();


              this.setEvents();
              this.designMode = '';

            }

        },

        setRemoveLabelEvents(){

          var iframe_tmp = document.querySelector('#website-container-iframe-vue').contentWindow.document.querySelector('body')

          var labels = iframe_tmp.querySelectorAll('.label-type'), self = this;

          for(var i = 0 ; i < labels.length ; i++){
            var type = labels[i].getAttribute('data');
            console.log(type)
            iframe_tmp.querySelector('.label-type-'+type +' .remove-selected').addEventListener('click',function(event){self.removeLabel(event)},false);
          }

        },

        removeLabel(event){
          console.log(event)
          var type = event.target.parentNode.getAttribute('data');
          console.log(type)
          var iframe_tmp = document.getElementById('website-container-iframe-vue').contentWindow.document.querySelector('body');
         
          document.getElementById('website-container-iframe-vue').contentWindow.document.getElementById('bordered-selected-' + type).classList.remove('bordered-selected-el');
          iframe_tmp.querySelector('.label-type-'+ type).remove();
          document.getElementById('indicator-' + type).classList.remove('done');

          delete this.types[type];

          var tmp = this.preview_data;
          var tmp2 = this.preview_selected;

          delete tmp[type];
          this.preview_data = tmp;

          delete tmp2[type];
          this.preview_selected = tmp2;

          this.designMode = '';
        },

        exitSelectMode(){
          this.designMode = ''
        },

        publish(){
          this.rules = '';
          //this.rules = '$body://body \n';
          //this.rules += '?exist: $body \n';
          //title

          document.querySelector('.submit-template').setAttribute('disabled','disabled');

          if( document.querySelector('input[name="channelName"]').value != '' ){
            this.rules += 'channel: "'+document.querySelector('input[name="channelName"]').value+'"'+'\n';
          }

          var self = this;

          var iframe = document.getElementById('website-container-iframe-vue').contentWindow.document.querySelector('body');

          /*if(!this.types['title'] || !this.types['body']){
            this.showModal('required','Title and Article Body is required!');
            document.querySelector('.submit-template').removeAttribute('disabled');
            return false;
          }*/

          document.querySelector('.submit-template').innerHTML = 'PUBLISHING...';

     
          for(var type_item in this.types){
             
              var title_confirm = false;
              
              /*if(this.types[type_item].getAttribute('id') != null){
                this.rules += type_item+': //'+this.types[type_item].nodeName.toLowerCase()+'[@id="'+this.types[type_item].getAttribute('id')+'"]'+'\n';
                title_confirm = true;
              } else{
*/
                if(this.types[type_item].classList != null && this.types[type_item].classList != ''){

                  if(this.types[type_item].classList != 'bordered-selected-el'){
                    if( iframe.querySelectorAll( this.classMaker(this.types[type_item].classList) ).length == 1 ){

                        this.rules += type_item+': //'+this.types[type_item].nodeName.toLowerCase()+'[@class="'+this.types[type_item].classList+'"]';

                          if(type_item == 'image_url')
                            this.rules += '/@src';

                          if(type_item == 'published_date')
                            this.rules +='/@datetime'

                          this.rules += '\n';
                          title_confirm = true;

                          console.log(this.rules);

                        }
                  }
                }
             // }

              if( iframe.querySelectorAll(this.types[type_item].nodeName).length == 1 ){
                  this.rules += type_item+': //'+this.types[type_item].nodeName.toLowerCase();

                  if(type_item == 'image_url')
                    this.rules += '/@src';

                  if(type_item == 'published_date')
                    this.rules +='/@datetime'

                  this.rules += '\n';
                  title_confirm = true;

              }

              var siblings = this.types[type_item].parentNode.childNodes;
            
              for(var i = 0 ; i < siblings.length ; i++){
                if(siblings[i] == this.types[type_item]){
                  console.log(i)
                  console.log(siblings[i].nodeName)
                }
              }


              var self = this;

              if(!title_confirm){
              
                var title_parent = self.types[type_item];
                var parents = [];

                do{

                  if(title_parent.parentNode != null){

                      title_parent = title_parent.parentNode;
                      parents.push(title_parent);

                      var tag_names = '',tag_rules = '';

                      parents.reverse().forEach(function(parent){
                        if(parent != null){
                         
                          if(parent.classList != null && parent.classList != ''){

                            if(parent.classList !='bordered-selected-el' && parent.classList!= 'bordered-active-el'){
                              tag_rules += parent.nodeName.toLowerCase() + '[@class="'+ parent.classList +'"]' + '//';
                              tag_names += parent.nodeName.toLowerCase()+self.classMaker(parent.classList) + ' ';
                            }
                          }
                          else{
                            tag_rules += parent.nodeName.toLowerCase() + '//';
                            tag_names += parent.nodeName.toLowerCase() + ' ';
                          }

                        }
                      });

                      var length = iframe.querySelectorAll(tag_names+this.types[type_item].nodeName).length;

                      if( length == 1 ){
                          this.rules += type_item+': //'+tag_rules+this.types[type_item].nodeName.toLowerCase();
                           if(type_item == 'image_url')
                              this.rules += '/@src';

                            if(type_item == 'published_date')
                              this.rules +='/@datetime'

                            this.rules += '\n';
                            title_confirm = true;
                      }



                  }  else{
                   // title_confirm = true;
                   // title_parent = self.types[type_item];
                    for(var i = 0 ; i<parents.length ; i++){
                      title_parent = parents.reverse()[i];

                      var tag_names = '',tag_rules = '';
                      for(var j = 0 ; j<i ; j++){
                        if(parent != null){
                          tag_names += parents.reverse()[j].nodeName.toLowerCase() + ' ';

                          tag_rules += parents.reverse()[j].nodeName.toLowerCase() + '//';
                        }
                      }

                      /*if(title_parent.getAttribute('id') != null){
                        this.rules += type_item+': //'+title_parent.nodeName.toLowerCase()+'[@id="'+title_parent.getAttribute('id')+'"]//'+tag_rules+this.types[type_item].nodeName.toLowerCase()+'\n';
                        title_confirm = true;
                        break;

                      } else{
                      */
                        if(title_parent.classList != null && title_parent.classList != ''){
                          if( iframe.querySelectorAll( this.classMaker(title_parent.classList) ).length == 1 ){
                            this.rules += type_item+': //'+title_parent.nodeName.toLowerCase()+'[@class="'+title_parent.classList+'"]//'+tag_rules+this.types[type_item].nodeName.toLowerCase();
                             if(type_item == 'image_url')
                              this.rules += '/@src';

                            if(type_item == 'published_date')
                              this.rules +='/@datetime'

                            this.rules += '\n';
                            title_confirm = true;

                            break;
                          }
                        }
                     // }
                      
                    }

                    title_confirm = true;
                    // this.showModal('Warning ! ','Some template rules Missed because of your html content issues.');
                    document.querySelector('.submit-template').innerHTML = 'PUBLISH';
                    
                  }

                } while(!title_confirm)



              }

              if(this.rules.indexOf('bordered-selected-el')>-1){
                for(var m = 0 ; m<this.rules.split(' bordered-selected-el').length ; m++)
                  this.rules = this.rules.replace(' bordered-selected-el','');
              }

              if(this.rules.indexOf('bordered-active-el')>-1){
                for(var m = 0 ; m<this.rules.split(' bordered-active-el').length ; m++)
                  this.rules = this.rules.replace(' bordered-active-el','');
              }

          }

          //add meta data

          this.rules += 'title: //meta[@name="title"]/@content'+' \n';
          this.rules += 'title: //meta[@property="og:title"]/@content'+' \n';
          this.rules += 'title: //meta[@itemprop="name"]/@content'+' \n';

          this.rules += 'description: //meta[@name="description"]/@content'+' \n';
          this.rules += 'description: //meta[@property="og:description"]/@content'+' \n';
          this.rules += 'description: //meta[@itemprop="description"]/@content'+' \n';

          this.rules += 'body: //meta[@name="description"]/@content'+' \n';

          this.rules += 'cover: //meta[@property="og:image"]/@content'+' \n';
          this.rules += 'cover: //meta[@itemprop="image"]/@content'+' \n';

          this.rules += 'author: //meta[@property="article:author"]/@content'+' \n';
          this.rules += 'published_date: //meta[@property="article:published_time"]/@content'+' \n';


          var domain = '';
            if(this.url.indexOf('https')>-1)
              domain = this.url.split('https://')[1].split('/')[0];
            else
              domain = this.url.split('http://')[1].split('/')[0];


         /* request( {url: window.api_url+'links',method:'POST',
            json:{
                'domain':domain,
                'url': this.url,
                'template' : this.rules,
                'created_at': new Date()
              }
            },function(er, response, body) {
              document.querySelector('.submit-template').removeAttribute('disabled');
              if(!er){
                document.querySelector('.submit-template').innerHTML = 'PUBLISH';
                window.location.assign('#/publish?id='+body.id);
              }
          });*/

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
                e.preventDefault();
                e.stopImmediatePropagation();

                if(!e.target.classList.contains('bordered-selected-el') && !e.target.classList.contains('label-type') && !e.target.classList.contains('remove-selected'))
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
        },
        analyseSelected(type){


          if(this.preview_data[type]){
            return false;
          }

          else if(this.preview_selected[type]){
            return false;
          }

          else{
            return true;
          }

        },
        getPreviewData(){

          for (var type in this.types){

            var el = this.types[type];

            this.preview_selected[type] = 1;

            if(type == 'published_date' )
              this.preview_data[type] = el.getAttribute('datetime')

            else if(el.nodeName == 'IMG' && type == 'cover')
              this.preview_data[type] = el.getAttribute('src')

            else if(type == 'body')
              this.preview_data[type] = el.innerHTML;              

            else 
              this.preview_data[type] = el.textContent;
          }

          this.designMode = 'preview-mode';
        }


      }
  }

</script>