import Vue from 'vue';
import Vuex from 'vuex';
import VueOnsen from 'vue-onsenui';
import CustomToolbar from './partials/CustomToolbar.vue';
import storeLike from './store.js';
import AppNavigator from './AppNavigator.vue';

import Vue2Leaflet from 'vue2-leaflet';
import leafletfullscreen from 'leaflet-fullscreen';
import VueFuse from 'vue-fuse';
import jsSHA from 'jssha';
//import leafletfullscreen from '../node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js';
//import Vue2Leaflet from '../node_modules/vue2-leaflet/dist/vue2-leaflet.min.js';
//import 'https://unpkg.com/leaflet@1.2.1/dist/leaflet.js';
//import 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.js';
//import '../src/assets/js/env_init.js'; // Onsen UI basic CSS

//import '../src/assets/js/map_init.js'; // Onsen UI basic CSS

import 'onsenui/css/onsenui.css'; // Onsen UI basic CSS
// import 'onsenui/css/onsen-css-components.css'; // Default Onsen UI CSS components
import './onsen-css-components.css'; // Onsen UI CSS components source for custom themes (requires cssnext)


import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css';
import '../src/assets/js/leaflet.groupedlayercontrol.js'; // Onsen UI basic CSS
import '../src/assets/css/leaflet.groupedlayercontrol.css';
Vue.use(Vuex);
Vue.use(VueOnsen);
Vue.use(Vue2Leaflet);
Vue.use(leafletfullscreen);
Vue.use(VueFuse);
Vue.component('custom-toolbar', CustomToolbar); // Common toolbar

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);



var bus = new Vue({
  el: '#app',
  render: h => h(AppNavigator),
  store: new Vuex.Store(storeLike),
  beforeCreate() {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid();

  }
});

var shaObj = new jsSHA("SHA-1", "TEXT");
var hash = shaObj.getHash("HEX");
console.log(shaObj);
console.log(hash);
