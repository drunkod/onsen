<template>
  <v-ons-page >
    <div class="content">
<div class="hide">
  </div>
    </div>
    <div id="map" style="height: 100%;">
    <v-map ref="map" :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" :dragging=dragging :fullscreenControl=fullscreenControl :bounds=bounds>
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        
    </v-map>
    </div>
    <v-ons-popover cancelable @click="actionSheetInfo.animation = 'none'; actionSheetInfo.visible = false; transition('lift-md', actionSheetInfo.title);"
        :visible.sync="actionSheetInfo.visible"
        target='.boroughs_popover'
        direction='down'
      >
        <p style="text-align: center">Lorem ipsum</p>
      </v-ons-popover>


  </v-ons-page>
</template>

<script>
import Popup from './Popup.vue';
import axios from 'axios';

// map init
const tileProviders = [
  {
    name: 'OpenStreetMap',
    attribution: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'BikeMap',
    url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + process.env.apikey_thunderforestcycle,
    attribution: 'BikeMap'
  },
  {
    name: 'OpenTopoMap',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'OpenTopoMap'
  },
];

export default {

  data () {
      return {
        zoom:10,
        center:[process.env.lat_city, process.env.lon_city],
        minZoom:1,
        maxZoom:17,
        opacity:1,
        url: tileProviders[0].url,
        attribution: tileProviders[0].attribution,
        dragging: false,
        draggable: true,
        fullscreenControl: true,
        alertDialog2Visible: false,
        dialog_title: 'title dialog',
        dialog_html: 'dfdf </br>'
      }
    },
    watch: {
    // эта функция запускается при любом изменении вопроса
    select_borough: function () {
      if (this.select_borough) {
        this.setStyle_borough()
      }
    }
    },
  computed: {
    bounds: function () {
        return this.$store.state.map.bounds
      },
      select_borough: function () {
            console.log("setStyle1")
              return this.$store.state.map.select_borough

          },
          actionSheetInfo: function () {
                console.log("actionSheetInfo")
                  return this.$store.state.map.actionSheetInfo

              },
              ActionSheetOptionsAnimation: function () {
                    console.log("ActionSheetOptionsAnimation")
                      return this.actionSheetInfo.animation

                  }

    },
        methods: {
        setStyle_borough () {
          console.log("setStyle3")
          var this_vue = this;
          this.$refs.map.mapObject._layers[this.select_borough].openPopup();
          this.$refs.map.mapObject._layers[this.select_borough]._popup._container.addEventListener('click', function(e){
    console.log("One of the many Small Polygon Links was clicked");
  })
              this.$refs.map.mapObject._layers[this.select_borough].setStyle({
                                weight: 5,
                                fill: true,
                                color: "#00FFFF",
                                opacity: 1,

                              })
                              setTimeout(function() {this_vue.resetStyle_borough()}, 1300)
        },
        resetStyle_borough () {
          this.$refs.map.mapObject._layers[this.select_borough].setStyle({
            color: "black",
            fill: false,
            weight: 2,
            opacity: 1,
            interactive: false,

                          })
        },
        transition(animation, name) {
          //this.PopupPage.name = name
          //this.PopupPage.name = name
          this.$store.commit('navigator/options', {
            // Sets animations
            animation: animation,
            // Resets default options
            callback: () => this.$store.commit('navigator/options', {})
          });
          this.$store.commit('navigator/push', {
            extends: Popup,
            data() {
              return {
                animation: animation
              }
            }
          });
        }
      },
    mounted() {

        var this_map = this.$refs.map,
        this_vue = this;

              /* Overlay Layers */

          /* Подсветка под маркером */
          var highlight = L.geoJson(null);
          var highlightStyle = {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          };
          /* Граница Районов */
          var boroughs = L.geoJson(null, {
            style: function(feature) {
              return {
                color: "black",
                fill: false,
                weight: 2,
                opacity: 1,
                interactive: false
              };
            },
            onEachFeature: function(feature, layer) {
              layer.bindPopup("<b>Hello world!</b><br>I am a popup.", {className: "popover"}).addTo(this_map.mapObject);
              console.log(layer._popup);
              this_vue.$store.commit('search/boroughSearch', {
                                            name: layer.feature.properties.BoroName,
                                            source: "район",
                                            //todo ключевые слова для поиска добавить (тополинка, северок..)
                                            id: L.stamp(layer),
                                            bounds: layer.getBounds()
                                          });
                            }
          });

          axios.get("../../src/assets/geojson/boroughs.geojson").then(response => {
            boroughs.addData(response.data);
            this_map.mapObject.addLayer(boroughs);
          });
          //Create a color dictionary based off of subway route_id
          var roadbikeColors = {
            "1": "#ff3135",
            "2": "#ff3135",
            "3": "ff3135",
            "4": "#009b2e",
            "5": "#009b2e",
            "6": "#009b2e",
            "7": "#ce06cb",
            "A": "#fd9a00",
            "C": "#fd9a00",
            "E": "#fd9a00",
            "SI": "#fd9a00",
            "H": "#fd9a00",
            "Air": "#ffff00",
            "B": "#ffff00",
            "D": "#ffff00",
            "F": "#ffff00",
            "M": "#ffff00",
            "G": "#9ace00",
            "FS": "#6e6e6e",
            "GS": "#6e6e6e",
            "J": "#976900",
            "Z": "#976900",
            "L": "#969696",
            "N": "#ffff00",
            "Q": "#ffff00",
            "R": "#ffff00"
          };

          var easyrouteColors = {
            "1": "#ff3135",
            "2": "#ff3135",
            "3": "ff3135",
            "4": "#009b2e",
            "5": "#009b2e",
            "6": "#009b2e",
            "7": "#ce06cb",
            "A": "#fd9a00",
            "C": "#fd9a00",
            "E": "#fd9a00",
            "SI": "#fd9a00",
            "H": "#fd9a00",
            "Air": "#ffff00",
            "B": "#ffff00",
            "D": "#ffff00",
            "F": "#ffff00",
            "M": "#ffff00",
            "G": "#9ace00",
            "FS": "#6e6e6e",
            "GS": "#6e6e6e",
            "J": "#976900",
            "Z": "#976900",
            "L": "#969696",
            "N": "#ffff00",
            "Q": "#ffff00",
            "R": "#ffff00"
          };

          var routeColors = {
            "1": "#ff3135",
            "2": "#ff3135",
            "3": "ff3135",
            "4": "#009b2e",
            "5": "#009b2e",
            "6": "#009b2e",
            "7": "#ce06cb",
            "A": "#fd9a00",
            "C": "#fd9a00",
            "E": "#fd9a00",
            "SI": "#fd9a00",
            "H": "#fd9a00",
            "Air": "#ffff00",
            "B": "#ffff00",
            "D": "#ffff00",
            "F": "#ffff00",
            "M": "#ffff00",
            "G": "#9ace00",
            "FS": "#6e6e6e",
            "GS": "#6e6e6e",
            "J": "#976900",
            "Z": "#976900",
            "L": "#969696",
            "N": "#ffff00",
            "Q": "#ffff00",
            "R": "#ffff00"
          };
          /* Велодороги */
          var roadbike = L.geoJson(null, {
            style: function(feature) {
              return {
                color: roadbikeColors[feature.properties.route_id],
                weight: 3,
                opacity: 1
              };
            },
            onEachFeature: function(feature, layer) {
              if (feature.properties) {
                layer.on({
                  click: function(e) {
                    this_vue.alertDialog2Visible = true;
                    this_vue.dialog_title = 'Привет мир! Привет мир!Привет мир! Привет мир! Привет мир!Привет мир! Привет мир! Привет мир!Привет мир! Привет мир! Привет мир!Привет мир! ';
                    this_vue.dialog_html = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Название</th><td>" + feature.properties.Line + "</td></tr>" + "<tr><th>Км</th><td>" + feature.properties.Distance + "</td></tr>" + "<tr><th>Описание</th><td>" + feature.properties.About + "</td></tr>" + "<tr><th>Цветовая метка</th><td>" + feature.properties.Division + "</td></tr>" + "<table><div id='" + process.env.CITY + "_roadbike_" + feature.id + "' class='hiper'> </div>";

          			var _hcp = {};
                    _hcp.widget_id = process.env.widget_id;
                    _hcp.xid = process.env.CITY + "_roadbike_" + feature.id;
                    _hcp.hc_disable = 1;
                    _hcp.append = "#" + process.env.CITY + "_roadbike_" + feature.id;
                    _hcp.callback = function(app, init) {
                      app.on('siteAuth', function(packet) {
                        console.log('event site auth =' + packet);
                      });
                      app.on('streamMessage', function(packet) {
                        console.log('event streamMessage =' + JSON.stringify(packet));
                      });
                      app.on('streamTopic', function(packet) {
                        console.log('event streamTopic =' + JSON.stringify(packet));
                      });
                      app.on('streamLike', function(packet) {
                        console.log('event streamLike =' + JSON.stringify(packet));
                      });
                    };
                    setTimeout(function() { HC.widget("Stream", _hcp, 'add'); console.log('Виджет грузим'); }, 1);

                  }
                });
              }
              layer.on({
                mouseover: function(e) {
                  var layer = e.target;
                  layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                  });
                  if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                  }
                },
                mouseout: function(e) {
                  roadbike.resetStyle(e.target);
                }
              });
            }
          });

            axios.get("../../src/assets/geojson/roadbike.geojson").then(response => {
                      roadbike.addData(response.data);
                    });
                             /* Для новичков */
          var easyroute = L.geoJson(null, {
            style: function(feature) {
              return {
                color: easyrouteColors[feature.properties.route_id],
                weight: 3,
                opacity: 1
              };
            },
            onEachFeature: function(feature, layer) {
              if (feature.properties) {

                layer.on({
                  click: function(e) {
                    this_vue.alertDialog2Visible = true;
                    this_vue.dialog_title = 'Привет мир!';
                    this_vue.dialog_html = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Название</th><td>" + feature.properties.Line + "</td></tr>" + "<tr><th>Км</th><td>" + feature.properties.Distance + "</td></tr>" + "<tr><th>Описание</th><td>" + feature.properties.About + "</td></tr>" + "<tr><th>Цветовая метка</th><td>" + feature.properties.Division + "</td></tr>" + "<table><div id='" + process.env.CITY + "_easyroute_" + feature.id + "' class='hiper'> </div>";
          			var _hcp = {};
                    _hcp.widget_id = process.env.widget_id;
                    _hcp.xid = process.env.CITY + "_easyroute_" + feature.id;
                    _hcp.hc_disable = 1;
                    _hcp.append = "#" + process.env.CITY + "_" + process.env.CITY + "_easyroute_" + feature.id;
                    _hcp.callback = function(app, init) {
                      app.on('siteAuth', function(packet) {
                        console.log('event site auth =' + packet);
                      });
                      app.on('streamMessage', function(packet) {
                        console.log('event streamMessage =' + JSON.stringify(packet));
                      });
                      app.on('streamTopic', function(packet) {
                        console.log('event streamTopic =' + JSON.stringify(packet));
                      });
                      app.on('streamLike', function(packet) {
                        console.log('event streamLike =' + JSON.stringify(packet));
                      });
                    };
                    setTimeout(function() { HC.widget("Stream", _hcp, 'add'); console.log('Виджет грузим'); }, 1);
                  }
                });
              }
              layer.on({
                mouseover: function(e) {
                  var layer = e.target;
                  layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                  });
                  if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                  }
                },
                mouseout: function(e) {
                  easyroute.resetStyle(e.target);
                }
              });
            }
          });

          axios.get("../../src/assets/geojson/easy.geojson").then(response => {
                    easyroute.addData(response.data);
                  });
                        /* Для любителей */
          var route = L.geoJson(null, {
            style: function(feature) {
              return {
                color: routeColors[feature.properties.route_id],
                weight: 3,
                opacity: 1
              };
            },
            onEachFeature: function(feature, layer) {
              if (feature.properties) {
                layer.on({
                  click: function(e) {
                    this_vue.alertDialog2Visible = true;
                    this_vue.dialog_title = 'Привет мир!';
                    this_vue.dialog_html = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Название</th><td>" + feature.properties.Line + "</td></tr>" + "<tr><th>Км</th><td>" + feature.properties.Distance + "</td></tr>" + "<tr><th>Описание</th><td>" + feature.properties.About + "</td></tr>" + "<tr><th>Цветовая метка</th><td>" + feature.properties.Division + "</td></tr>" + "<table><div id='" + process.env.CITY + "_route_" + feature.id + "' class='hiper'> </div>";
          			var _hcp = {};
                    _hcp.widget_id = process.env.widget_id;
                    _hcp.xid = process.env.CITY + "_route_" + feature.id;
                    _hcp.hc_disable = 1;
                    _hcp.append = "#" + process.env.CITY + "_route_" + feature.id;
                    _hcp.callback = function(app, init) {
                      app.on('siteAuth', function(packet) {
                        console.log('event site auth =' + packet);
                      });
                      app.on('streamMessage', function(packet) {
                        console.log('event streamMessage =' + JSON.stringify(packet));
                      });
                      app.on('streamTopic', function(packet) {
                        console.log('event streamTopic =' + JSON.stringify(packet));
                      });
                      app.on('streamLike', function(packet) {
                        console.log('event streamLike =' + JSON.stringify(packet));
                      });
                    };
                    setTimeout(function() { HC.widget("Stream", _hcp, 'add'); console.log('Виджет грузим'); }, 1);
                  }
                });
              }
          	//подсветка марш
              layer.on({
                mouseover: function(e) {
                  var layer = e.target;
                  layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                  });
                  if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                  }
                },
                mouseout: function(e) {
                  route.resetStyle(e.target);
                }
              });
            }
          });
          axios.get("../../src/assets/geojson/route.geojson").then(response => {
                    route.addData(response.data);
                  });





          /* Map init */
          /* Larger screens get expanded layer control and visible sidebar */
            if (document.body.clientWidth <= 767) {
              var isCollapsed = true;
            } else {
              var isCollapsed = false;
            }

            var osm = L.tileLayer(tileProviders[0].url, {attribution: tileProviders[0].attribution}),
            osmb   = L.tileLayer(tileProviders[1].url, {attribution: tileProviders[1].attribution}),
            osmhill   = L.tileLayer(tileProviders[2].url, {attribution: tileProviders[2].attribution});

            var baseLayers = {
              "Основная": osm,
              "Велосипедная": osmb,
              "Рельефная": osmhill
            };

            var groupedOverlays = {
              "На карте": {
                //"<img src='assets/img/online.svg' width='24' height='28'>&nbsp;Онлайн": online_bikeLayer,
                //"<img src='assets/img/event.svg' width='24' height='28'>&nbsp;Встречи": event_bikeLayer,
                //"<img src='assets/img/park.svg' width='24' height='28'>&nbsp;Парковки": parkLayer,
                //"<img src='assets/img/repair.svg' width='24' height='28'>&nbsp;Мастерские": masterLayer,
                //"<img src='assets/img/shop.svg' width='24' height='28'>&nbsp;Магазины": shopLayer,
                "&nbsp;Районы города": boroughs
              },
              "Маршруты": {
                "Велодороги": roadbike,
                "Для новичков": easyroute,
                "Для любителей": route
              }
            };

            var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
              collapsed: isCollapsed
            }).addTo(this_map.mapObject);

      this_map.mapObject.addLayer(osm);

      //Block only map dragging
      // or, add to an existing map:
      //map.addControl(new L.Control.Fullscreen());
      this.$refs.map.mapObject.on('fullscreenchange', function () {
          if (this_map.mapObject.isFullscreen()) {
            this_map.mapObject.dragging.enable();
              console.log('entered fullscreen');
          } else {
              console.log('exited fullscreen');
            this_map.mapObject.dragging.disable();
          }
      });


    }
};
</script>

<style scoped>

.camera {
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hide {
  position: fixed;
  right: 0;
  height: 100%;
  width: 100px;
  z-index: 800;
}
/* Default icon URLs */
.leaflet-default-icon-path img {
	background-image: url(../../node_modules/vue2-leaflet/examples/src/assets/images/marker-icon.png);
	}

  .alert-dialog-container {
    height: auto;
    overflow: auto;
}
.card {
  background-color: white;
  background-image: url(../assets/img/sushi-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  height: 250px;
}

.card-toolbar ons-back-button span {
  color: white;
}

.card-name {
  font-weight: 600;
  font-size: 20px;
  padding: 66px 0 8px 0;
  text-align: center;
}

.card-desc {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.9;
  text-align: center;
  line-height: 1.4;
}

.rating {
  text-align: center;
  position: relative;
  height: 0px;
}

.rating-num {
  position: relative;
  top: -24px;
  height: 24px;
  color: white;
  line-height: 24px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  border-radius: 4px 4px 0 0;
  padding: 0 6px;
  background-color: #eb482f;
  color: white;
  width: auto;
  margin: 0 auto 0 auto;
  display: inline-block;
}

.rating-num ons-icon {
  font-size: 11px;
  vertical-align: -0px;
}

.action-col {
  text-align: center;
  opacity: 0.4;
  padding: 10px 0 8px;
}

.action-col:active {
  opacity: 0.7;
}

.action-col ons-button {
  padding: 0;
  line-height: 1;
}

.action-icon {
  padding: 0 0 4px 0;
}

.action-icon ons-icon {
  font-size: 28px;
}

.action-label {
  font-size: 18px;
}

.prop-desc {
  font-size: 14px;
  opacity: 0.7;
}

.prop-desc ons-icon {
  font-size: 14px;
  vertical-align: -0px;
  opacity: 0.5;
}
</style>
