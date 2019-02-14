<template>
  <div
    class="container"
    :class="{
      'is-loading-done': isLoadingDone,
      'is-intro': isIntro
    }"
  >
    <BarTop>
      <TheNavMain />
      <TheNavMeta />
    </BarTop>


    <div class="content">
      <div
        class="intro"
        @click.prevent="isIntro = false"
      >
        dawdawd
      </div>

      <div
        :class="{ 'has-pointer-events': hasPointerEvents }"
        class="map"
      >
        <BarBottomMap>
          <MapToggle
            :is-active="hasMapToggle"
            @toggle-status="mapToggleHandler"
          />

          <MapScale :is-other-scale="mapToggleStatus" />
        </BarBottomMap>

        <no-ssr>
          <mapbox
            :access-token="mapboxAccessToken"
            :map-options="mapBoxOptions"
            :nav-control="{
              show: false,
              position: 'top-right'
            }"
            @map-init="mapInitialized"
            @map-load="mapLoaded"
          />
        </no-ssr>
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
import MapToggle from '~/components/BaseMapToggle.vue'

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
    MapToggle,

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
      isLoadingDone: false,
      hasPointerEvents: false,

      isIntro: true,

      hasMapBottomBar: false,
      hasMapToggle: false,
      mapToggleStatus: false,
      isMapInit: false,
      isMapLoaded: false,
      thisMap: {},

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
        maxBounds: [[9.55, 53.3], [10.4, 53.8]],
        bounds: [[9.6, 53.378], [10.37, 53.753]]
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

      //
      // only do this stuff if map is done init and loading
      if (this.isMapInit && this.isMapLoaded) {
        switch (element.id) {
          default:
          case 'GesundheitsversorgungDeutschland':
            this.thisMap.fitBounds([[9.6, 53.378], [10.37, 53.753]])
            this.thisMap.removeLayer('bezirk-fill')

            this.hasMapToggle = false
            break

          case 'UeberversorgtOderNicht':
            this.thisMap.flyTo({ zoom: 12.5 })
            this.thisMap.addLayer({
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

            this.hasMapToggle = false
            break

          case 'ZugangGesundheitseinrichtungen':
            this.hasMapToggle = false
            break

          case 'ZugangGesundheitseinrichtungenUndEinkommen':
            this.thisMap.flyTo({ zoom: 11 })
            this.hasMapToggle = true
            break

          case 'StadtteileEinkommensgruppe':
            this.hasMapToggle = true
            break

          case 'CaseStudies':
            this.hasMapToggle = true
            break
        }
      }
    },

    mapToggleHandler(status) {
      this.mapToggleStatus = status
    },

    // mapClicked(map, e) {
    //   this.addPopUp(map, e)
    // },

    // addPopUp(map, e) {
    //   const mapboxgl = require('mapbox-gl/dist/mapbox-gl')
    //   const features = map.queryRenderedFeatures(e.point, {
    //     layers: ['points']
    //   })

    //   if (!features.length) {
    //     return
    //   }

    //   const feature = features[0]

    //   const popupContent = this.$extend({
    //     methods: {
    //       popupClicked() {
    //         alert('Popup Clicked!')
    //       }
    //     },
    //     template: '<button @click="popupClicked">Click Me!</button>'
    //   })

    //   // Populate the popup and set its coordinates
    //   // based on the feature found.
    //   new mapboxgl.Popup()
    //     .setLngLat(feature.geometry.coordinates)
    //     .setHTML('<div id="vue-popup-content"></div>')
    //     .addTo(map)

    //   new popupContent().$mount('#vue-popup-content')
    // },

    mapInitialized(map) {
      console.log('map init')
      this.thisMap = map
      this.isMapInit = true
    },

    mapLoaded(map) {
      console.log('map loaded')

      this.thisMap.addSource('bezirke_social-status-index-2016', {
        type: 'geojson',
        data:
          '/map-jsons/hamburg-stadtteile-bezirke_social-status-index-2016.geojson'
      })

      this.isMapLoaded = true
      this.isLoadingDone = true
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s $easeOutQuint;

  &.is-intro {
    height: 100vh;
    overflow: hidden;

    .bar-top {
      transform: translateY(#{-$margin * 8});
    }

    .content {
      .intro {
        transform: translateY(0);
      }

      article {
        transform: translateX(-50vw);
      }

      .map {
        .bar-bottom-map {
          transform: translateY(#{$margin * 2});
        }
      }
    }
  }

  &.is-loading-done {
    opacity: 1;
    pointer-events: all;

    .content {
      overflow: unset;
    }
  }

  @include until(1024px) {
    display: none;
  }

  .bar-top {
    transform: translateY(0);
    transition: transform 1s 1s $easeOutQuint;
  }

  .content {
    position: relative;
    overflow: hidden;

    .intro {
      position: absolute;
      background: linear-gradient(
        to right,
        rgba($blue, 1) 33%,
        rgba($blue, 0.9) 100%
      );
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 999;
      overflow-y: scroll;
      transform: translateY(-100vh);
      transition: transform 1s $easeOutQuint;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/pics/bgr-intro.svg') 50% 50% no-repeat;
      }
    }

    article {
      position: relative;
      width: (100 / 3) * 1vw;
      /* max-width: 30 * $size-20; */
      margin: 0 0 ($margin * 2);
      padding-left: $margin * 2;
      background: #fff;
      transform: translateX(0);
      transition: transform 0.75s $easeOutQuint;

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
      width: (100 / 3) * 2 * 1vw;
      margin-left: (100 / 3) * 1vw;
      background: $gray;

      @include from(2040px) {
        margin-left: 733px;
        width: calc(100vw - 733px);
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

      .bar-bottom-map {
        transition: transform 1s $easeOutQuint;
      }

      #map {
        width: 100%;
        height: inherit;
      }
    }
  }
}
</style>
