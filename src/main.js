import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store';

import StartView from './components/Start.vue'
import EditorView from './components/Editor.vue'
import PublishView from './components/Publish.vue'
import PanelView from './components/Panel.vue'
import GenerateView from './components/Generate.vue'

import App from './components/App.vue'

const api_port = '8000', 
      protocol = 'http://',
      api_url = protocol+'localhost'+':'+api_port+'/api/';

window.api_url = api_url;

var _routes = {
  routes: [
    { path: '', component: StartView, name: 'Instant View Telegram Generator' },
    { path: '/start', component: StartView, name: 'Instant View Telegram Generator' },
    { path: '/editor', component: EditorView, name: 'Editor Instant View Maker' },
    { path: '/publish', component: PublishView, name: 'Publish your instant view' },
    { path: '/karim', component: PanelView, name: 'Instant View Telegram Generator' },
    { path: '/generate', component: GenerateView, name: 'Auto Generate Template' }
  ]
};

_routes.routes.push({
   path: '*',
   redirect: ''
});

Vue.use(VueRouter);

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
 routes: _routes.routes,
 history:true
})

router.beforeEach(function (to, from, next) {
    window.scrollTo(0, 0);
    next();
    //start loading
});

router.afterEach(function (route) {      
  document.title = route.name;
});

//instatinat the vue instance
new Vue({
  //define the selector for the root component
  el: '#app',
  //pass the template to the root component
  template: '<App/>',
  //declare components that the root component can access
  components: { App },
  //pass in the router to the vue instance
  router
}).$mount('#app')//mount the router on the app



