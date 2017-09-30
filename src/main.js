import Vue from 'vue';
import Vuex from 'vuex';
import VueOnsen from 'vue-onsenui';
import CustomToolbar from './partials/CustomToolbar.vue';
import storeLike from './store.js';
import AppNavigator from './AppNavigator.vue';
import Vue2Leaflet from 'vue2-leaflet';
//import Vue2Leaflet from '../node_modules/vue2-leaflet/dist/vue2-leaflet.min.js';
//import Leaflet from 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.js';
//import 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.js';
//import '../node_modules/leaflet/dist/leaflet.css'; // Onsen UI basic CSS

import 'onsenui/css/onsenui.css'; // Onsen UI basic CSS
// import 'onsenui/css/onsen-css-components.css'; // Default Onsen UI CSS components
import './onsen-css-components.css'; // Onsen UI CSS components source for custom themes (requires cssnext)
import '../node_modules/leaflet/dist/leaflet.css';

Vue.use(Vuex);
Vue.use(VueOnsen);
Vue.use(Vue2Leaflet);
Vue.component('custom-toolbar', CustomToolbar); // Common toolbar

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

new Vue({
  el: '#app',
  render: h => h(AppNavigator),
  store: new Vuex.Store(storeLike),
  beforeCreate() {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid();

  }
});
