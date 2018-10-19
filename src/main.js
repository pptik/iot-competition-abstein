//Import Vue Essential Library
import Vue from 'vue'
import VueSession from 'vue-session'
import App from './App.vue'
import HakCipta from './components/HakCipta'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import VueSocketio from 'vue-socket.io';
import Datepicker from 'vuejs-datepicker';

//Import CSS dan JS

import 'jquery/dist/jquery.min.js'
//import 'jquery-ui/build/release.js'
import 'semantic-ui/dist/semantic.min.js'
import 'semantic-ui/dist/semantic.min.css'
import socketio from 'socket.io-client';
import '../src/assets/css/custom.css'
//import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.css'


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(VModal);
Vue.use(VueSocketio, socketio('http://167.205.7.226:9099/'));

Vue.component('hak-cipta',HakCipta)
Vue.component('datepicker',Datepicker)

Vue.http.options.emulateJSON = true
/* Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true 
Vue.http.options.crossOrigin = true*/

// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
// Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
