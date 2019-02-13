<template>
  <div class="container">
    <BarTop>
      <TheNavMain />
      <TheNavMeta />
    </BarTop>


    <div class="content">
      <div
        :class="{ 'has-pointer-events': hasPointerEvents }"
        class="map"
      >
        <BarBottomMap>
          <MapScale />
        </BarBottomMap>

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
          :offset="0.025"
          :debug="true"
          @step-enter="scrollamaStepEnterHandler"
        >
          <div id="GesundheitsversorgungDeutschland" class="step anchor">
            <cGesundheitsversorgungDeutschland />
          </div>

          <div id="UeberversorgtOderNicht" class="step anchor">
            <cUeberversorgtOderNicht />
          </div>

          <div id="ZugangGesundheitseinrichtungen" class="step anchor">
            <cZugangGesundheitseinrichtungen />
          </div>

          <div id="ZugangGesundheitseinrichtungenUndEinkommen" class="step anchor">
            <cZugangGesundheitseinrichtungenUndEinkommen />
          </div>

          <div id="StadtteileEinkommensgruppe" class="step anchor">
            <cStadtteileEinkommensgruppe />
          </div>

          <div id="CaseStudies" class="step anchor">
            <cCaseStudies />
          </div>
        </Scrollama>
      </article>
    </div>
  </div>
</template>


<script>
import anchorElements from '~/mixins/anchorElements'

import TheNavMain from '~/components/TheNavMain.vue'
import TheNavMeta from '~/components/TheNavMeta.vue'
import BarTop from '~/components/BaseBarTop.vue'
import BarBottomMap from '~/components/BaseBarBottomMap.vue'
import MapScale from '~/components/BaseMapScale.vue'

import cGesundheitsversorgungDeutschland from '~/components/content/cGesundheitsversorgungDeutschland.vue'
import cUeberversorgtOderNicht from '~/components/content/cUeberversorgtOderNicht.vue'
import cZugangGesundheitseinrichtungen from '~/components/content/cZugangGesundheitseinrichtungen.vue'
import cZugangGesundheitseinrichtungenUndEinkommen from '~/components/content/cZugangGesundheitseinrichtungenUndEinkommen.vue'
import cStadtteileEinkommensgruppe from '~/components/content/cStadtteileEinkommensgruppe.vue'
import cCaseStudies from '~/components/content/cCaseStudies.vue'

export default {
  components: {
    TheNavMain,
    TheNavMeta,
    BarTop,
    BarBottomMap,
    MapScale,

    // content
    cGesundheitsversorgungDeutschland,
    cUeberversorgtOderNicht,
    cZugangGesundheitseinrichtungen,
    cZugangGesundheitseinrichtungenUndEinkommen,
    cStadtteileEinkommensgruppe,
    cCaseStudies
  },

  mixins: [anchorElements],

  data() {
    return {
      hasPointerEvents: false,
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

  mounted() {
    this.$nextTick(() => {
      this.createAnchors()
    })
  },

  methods: {
    scrollamaStepEnterHandler({ element, index, direction }) {
      // console.log(element, index, direction)
      // console.log(element)

      switch (element.id) {
        default:
        case 'GesundheitsversorgungDeutschland':
          this.map.flyTo({ zoom: 11 })
          break

        case 'UeberversorgtOderNicht':
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
  @include until(1024px) {
    display: none;
  }

  .content {
    article {
      position: relative;
      width: (100 / 3) * 1%;
      /* max-width: 30 * $size-20; */
      margin: 0 0 ($margin * 2);
      padding-left: $margin * 2;
      background: #fff;

      @include from(2040px) {
        width: 675px;
      }

      .step {
        display: block;
        margin-bottom: $margin * 10;
        padding-top: $margin * 8;
        min-height: 100vh;
      }
    }

    .map {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: (100 / 3) * 2 * 1%;
      margin-left: (100 / 3) * 1%;
      background: $gray;
      /* pointer-events: none; */

      @include from(2040px) {
        margin-left: 733px;
        width: calc(100% - 733px);
      }

      &.has-pointer-events {
        pointer-events: all;
      }

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
        background: $white-gradient;
      }

      #map {
        width: 100%;
        height: inherit;
      }
    }
  }
}
</style>
