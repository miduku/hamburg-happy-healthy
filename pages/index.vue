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
      <TheNavMeta
        @click-intro="isIntro = true"
      />
    </BarTop>


    <div class="content">
      <div class="intro">
        <cIntro @close-intro="isIntro = false" />
      </div>

      <div class="map">
        <BarBottomMap :class="{ 'has-bar-bottom-map': hasBarBottomMap }">
          <MapToggle
            :is-active="hasMapToggle"
            @toggle-status="mapToggleHandler"
          />

          <MapScale :is-other-scale="mapToggleStatus" />
        </BarBottomMap>

        <no-ssr>
          <mapbox
            :class="{ 'has-no-pointer-events': !hasPointerEvents }"
            :access-token="mapboxAccessToken"
            :map-options="mapBoxOptions"
            :nav-control="{
              show: false,
              position: 'top-right'
            }"
            @map-init="mapInitialized"
            @map-load="mapLoaded"
            @map-zoomstart="mapZoomStart"
            @map-zoomend="mapZoomEnd"
          />
        </no-ssr>
      </div>

      <article>
        <Scrollama
          :offset="0.5"
          :debug="true"
          @step-enter="scrollamaStepEnterHandler"
        >
          <div
            id="GesundheitsversorgungDeutschland"
            class="step anchor"
          >
            <cGesundheitsversorgungDeutschland />
          </div>

          <div
            id="UeberversorgtOderNicht"
            class="step anchor"
          >
            <cUeberversorgtOderNicht />
          </div>

          <div
            id="ZugangGesundheitseinrichtungen"
            class="step anchor"
          >
            <cZugangGesundheitseinrichtungen />
          </div>

          <div
            id="ZugangGesundheitseinrichtungenUndEinkommen"
            class="step anchor"
          >
            <cZugangGesundheitseinrichtungenUndEinkommen />
          </div>

          <div
            id="StadtteileEinkommensgruppeHoch"
            class="step anchor"
            style="padding-bottom: 0"
          >
            <cStadtteileEinkommensgruppeHoch />
          </div>

          <div
            id="StadtteileEinkommensgruppeMittel"
            class="step"
            style="padding: 0"
          >
            <cStadtteileEinkommensgruppeMittel />
          </div>

          <div
            id="StadtteileEinkommensgruppeNiedrig"
            class="step"
            style="padding: 0"
          >
            <cStadtteileEinkommensgruppeNiedrig />
          </div>

          <div
            id="StadtteileEinkommensgruppeAlle"
            class="step"
            style="padding-top: 0"
          >
            <cStadtteileEinkommensgruppeAlle />
          </div>

          <div
            id="CaseStudies"
            class="step anchor"
            style="min-height: 100vh;"
          >
            <cCaseStudies />
            <TheCaseStudySelector />
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
import TheCaseStudySelector from '~/components/TheCaseStudySelector.vue'
import BarTop from '~/components/BaseBarTop.vue'
import BarBottomMap from '~/components/BaseBarBottomMap.vue'
import MapScale from '~/components/BaseMapScale.vue'
import MapToggle from '~/components/BaseMapToggle.vue'

import cIntro from '~/components/content/cIntro.vue'
import cGesundheitsversorgungDeutschland from '~/components/content/cGesundheitsversorgungDeutschland.vue'
import cUeberversorgtOderNicht from '~/components/content/cUeberversorgtOderNicht.vue'
import cZugangGesundheitseinrichtungen from '~/components/content/cZugangGesundheitseinrichtungen.vue'
import cZugangGesundheitseinrichtungenUndEinkommen from '~/components/content/cZugangGesundheitseinrichtungenUndEinkommen.vue'
import cStadtteileEinkommensgruppeHoch from '~/components/content/cStadtteileEinkommensgruppeHoch.vue'
import cStadtteileEinkommensgruppeMittel from '~/components/content/cStadtteileEinkommensgruppeMittel.vue'
import cStadtteileEinkommensgruppeNiedrig from '~/components/content/cStadtteileEinkommensgruppeNiedrig.vue'
import cStadtteileEinkommensgruppeAlle from '~/components/content/cStadtteileEinkommensgruppeAlle.vue'
import cCaseStudies from '~/components/content/cCaseStudies.vue'

export default {
  components: {
    TheNavMain,
    TheNavMeta,
    TheCaseStudySelector,
    BarTop,
    BarBottomMap,
    MapScale,
    MapToggle,

    // content
    cIntro,
    cGesundheitsversorgungDeutschland,
    cUeberversorgtOderNicht,
    cZugangGesundheitseinrichtungen,
    cZugangGesundheitseinrichtungenUndEinkommen,
    cStadtteileEinkommensgruppeHoch,
    cStadtteileEinkommensgruppeMittel,
    cStadtteileEinkommensgruppeNiedrig,
    cStadtteileEinkommensgruppeAlle,
    cCaseStudies
  },

  mixins: [anchorElements],

  data() {
    return {
      isLoadingDone: false,
      hasPointerEvents: false,

      isIntro: true,

      hasBarBottomMap: false,
      hasMapToggle: false,
      mapToggleStatus: false,
      isMapInit: false,
      isMapLoaded: false,
      thisMap: {},

      doAtZoomEnd: Function,

      maxBounds_germany: [[3.9, 46.7], [16, 55.8]],
      bounds_germany: [[4, 47], [15.9, 55]],
      maxBounds_hamburg: [[9.55, 53.3], [10.4, 53.8]],
      bounds_hamburg: [[9.6, 53.378], [10.37, 53.753]],
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
      mapBoxOptions: {
        style: 'mapbox://styles/miduku/cjqbe0tc131jb2spn17qwvcsv',
        center: [10.018, 53.569],
        // zoom: 9.75,
        attributionControl: false,
        dragRotate: false,
        // dragPan: false,
        pitchWithRotate: false,
        keyboard: false,
        touchZoomRotate: false,
        doubleClickZoom: false,
        scrollZoom: false,
        boxZoom: false
        // maxBounds: [[9.55, 53.3], [10.4, 53.8]],
        // bounds: [[9.6, 53.378], [10.37, 53.753]]
      }
    }
  },

  head() {
    return {
      bodyAttrs: {
        class: this.isIntro ? 'lock-scroll' : ''
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.createAnchors()
      // this.mapBoxOptions.maxBounds = this.maxBounds_germany
      this.mapBoxOptions.bounds = this.bounds_germany
    })
  },

  methods: {
    scrollamaStepEnterHandler({ element, index, direction }) {
      // only do this stuff if map is done init and loading
      if (this.isMapInit && this.isMapLoaded) {
        switch (element.id) {
          default:
          case 'GesundheitsversorgungDeutschland':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_germany)
            this.thisMap.removeLayer('bezirk-fill')
            this.doAtZoomEnd = () => {}

            this.hasBarBottomMap = false
            this.hasMapToggle = false
            break

          case 'UeberversorgtOderNicht':
            console.log(element.id)
            // this.thisMap.flyTo({ zoom: 12.5 })
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.doAtZoomEnd = () => {
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
            }

            this.hasBarBottomMap = true
            this.hasMapToggle = false
            break

          case 'ZugangGesundheitseinrichtungen':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.hasMapToggle = false
            break

          case 'ZugangGesundheitseinrichtungenUndEinkommen':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.thisMap.flyTo({ zoom: 11 })
            this.hasMapToggle = true
            break

          case 'StadtteileEinkommensgruppeHoch':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.hasMapToggle = true
            break

          case 'StadtteileEinkommensgruppeMittel':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.hasMapToggle = true
            break

          case 'StadtteileEinkommensgruppeNiedrig':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.hasMapToggle = true
            break

          case 'StadtteileEinkommensgruppeAlle':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.hasMapToggle = true
            break

          case 'CaseStudies':
            console.log(element.id)
            this.hasPointerEvents = false
            this.thisMap.fitBounds(this.bounds_hamburg)
            this.hasMapToggle = true
            break
        }
      }
    },

    mapZoomStart() {
      // this.hasPointerEvents = false
    },

    mapZoomEnd() {
      // this.hasPointerEvents = true
      return this.doAtZoomEnd()
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
    .bar-top {
      transform: translateY(#{-$margin * 8});
    }

    .content {
      .intro {
        transform: translateY(0);
      }

      article {
        opacity: 0;
      }

      .map {
        .bar-bottom-map {
          transform: translateY(#{$margin * 4});
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
      position: fixed;
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
      opacity: 1;
      transition: opacity 1s 0.5s $easeOutQuint;
      display: inline-block;
      width: $width-article * 1vw;
      /* max-width: 30 * $size-20; */
      /* margin: 0 0 ($margin * 2); */
      padding: 0 ($margin * 2);
      background: #fff;
      /* border-right: 2px solid $gray; */
      /* @extend %box-shadow; */

      @include from(2040px) {
        width: $max-side-width;
      }

      .step {
        display: block;
        padding-bottom: $margin * 6;
        padding-top: $margin * 6;
      }
    }

    .map {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: $width-map * 1vw;
      margin-left: $width-article * 1vw;
      background: $gray;

      @include from(2040px) {
        margin-left: $max-side-width;
        width: calc(100vw - #{$max-side-width});
      }

      .has-no-pointer-events {
        pointer-events: none;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: $width-article * 1%;
        height: 100%;
        max-width: 200px;
        pointer-events: none;
        z-index: 1;
        background: $white-gradient;
      }

      .bar-bottom-map {
        transition: transform 1s $easeOutQuint;
        transform: translateY(#{$margin * 4});

        &.has-bar-bottom-map {
          transform: translateY(0);
        }
      }

      #map {
        width: 100%;
        height: inherit;
      }
    }
  }
}
</style>
