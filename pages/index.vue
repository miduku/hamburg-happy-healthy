<template>
  <div class="container">
    <BarTop>
      <TheNavMain />
      <TheNavMeta />
    </BarTop>


    <div class="content">
      <div class="map">
        <Mapbox
          :access-token="mapboxAccessToken"
          :map-options="mapBoxOptions"
          :nav-control="{
            show: false,
            position: 'top-right'
          }"
          @map-init="mapInitialized"
          @map-load="mapLoaded"
          @map-click="mapClicked"
        />
      </div>

      <article>
        <Scrollama
          :offset="0.8"
          :debug="true"
          @step-enter="scrollamaStepEnterHandler"
        >
          <div class="step">
            <cGesundheitsversorgungDeutschland />
          </div>

          <div class="step">
            <cUeberversorgtOderNicht />
          </div>
        </Scrollama>
      </article>
    </div>
  </div>
</template>


<script>
import TheNavMain from '~/components/TheNavMain.vue'
import TheNavMeta from '~/components/TheNavMeta.vue'
import BarTop from '~/components/BaseBarTop.vue'

import cGesundheitsversorgungDeutschland from '~/components/content/cGesundheitsversorgungDeutschland.vue'
import cUeberversorgtOderNicht from '~/components/content/cUeberversorgtOderNicht.vue'

export default {
  components: {
    TheNavMain,
    TheNavMeta,
    BarTop,

    // content
    cGesundheitsversorgungDeutschland,
    cUeberversorgtOderNicht
  },

  data() {
    return {
      map: {},
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
      mapBoxOptions: {
        style: 'mapbox://styles/miduku/cjqbe0tc131jb2spn17qwvcsv',
        center: [10.018, 53.569],
        zoom: 9.75,
        attributionControl: false,
        dragRotate: false,
        // dragPan: false,
        pitchWithRotate: false,
        keyboard: false,
        bounds: [[9.6, 53.378], [10.37, 53.753]],
        maxBounds: [[9.6, 53.378], [10.37, 53.753]]
      }
    }
  },

  methods: {
    scrollamaStepEnterHandler({ element, index, direction }) {
      // console.log(element, index, direction)

      switch (index) {
        default:
        case 0:
          this.map.flyTo({ zoom: 11 })
          break

        case 1:
          this.map.flyTo({ zoom: 12.5 })
          break
      }
    },

    mapClicked(map, e) {
      this.addPopUp(map, e)
    },

    addPopUp(map, e) {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl')
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['points']
      })

      if (!features.length) {
        return
      }

      const feature = features[0]

      const popupContent = this.$extend({
        methods: {
          popupClicked() {
            alert('Popup Clicked!')
          }
        },
        template: '<button @click="popupClicked">Click Me!</button>'
      })

      // Populate the popup and set its coordinates
      // based on the feature found.
      new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<div id="vue-popup-content"></div>')
        .addTo(map)

      new popupContent().$mount('#vue-popup-content')
    },

    mapInitialized(map) {
      console.log('map init')
      this.map = map
    },

    mapLoaded(map) {
      console.log('map loaded')

      map.addSource('bezirke_social-status-index-2016', {
        type: 'geojson',
        data:
          '/map-jsons/hamburg-stadtteile-bezirke_social-status-index-2016.geojson'
      })

      map.addLayer({
        id: 'bezirk-fill',
        type: 'fill',
        source: 'bezirke_social-status-index-2016',
        layout: {},
        paint: {
          'fill-color': '#627BC1',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  /* margin: $margin * 2; */
  padding-top: $margin * 6;

  .content {
    /* background: lightsalmon; */

    article {
      position: relative;
      width: (100 / 3) * 1%;
      max-width: 30 * $size-20;
      background: #fff;
      margin: ($margin * 2) 0;
      padding-left: $margin * 2;
      background: #fff;

      .step {
        margin-bottom: $margin * 10;
      }
    }

    .map {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: (100 / 3) * 2 * 1%;
      margin-left: (100 / 3) * 1%;
      background: yellowgreen;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: (100 / 3) * 1%;
        height: 100%;
        max-width: 200px;
        pointer-events: none;
        z-index: 1;
        /* https://larsenwork.com/easing-gradients/ */
        background: linear-gradient(
          to right,
          hsl(0, 0%, 100%) 0%,
          hsla(0, 0%, 100%, 0.987) 8.1%,
          hsla(0, 0%, 100%, 0.951) 15.5%,
          hsla(0, 0%, 100%, 0.896) 22.5%,
          hsla(0, 0%, 100%, 0.825) 29%,
          hsla(0, 0%, 100%, 0.741) 35.3%,
          hsla(0, 0%, 100%, 0.648) 41.2%,
          hsla(0, 0%, 100%, 0.55) 47.1%,
          hsla(0, 0%, 100%, 0.45) 52.9%,
          hsla(0, 0%, 100%, 0.352) 58.8%,
          hsla(0, 0%, 100%, 0.259) 64.7%,
          hsla(0, 0%, 100%, 0.175) 71%,
          hsla(0, 0%, 100%, 0.104) 77.5%,
          hsla(0, 0%, 100%, 0.049) 84.5%,
          hsla(0, 0%, 100%, 0.013) 91.9%,
          hsla(0, 0%, 100%, 0) 100%
        );
      }

      #map {
        width: 100%;
        height: inherit;
      }
    }
  }
}
</style>
