<template>
  <div
    class="container"
    :class="{
      'is-loading-done': isMapLoaded,
      'is-intro': isIntro
    }"
  >
    <BarTop>
      <TheNavMain />
      <TheNavMeta @click-intro="isIntro = true" />
    </BarTop>


    <div class="content">
      <div class="intro">
        <cIntro @close-intro="isIntro = false" />
      </div>

      <div class="map">
        <BarBottomMap :class="{ 'has-bar-bottom-map': hasBarBottomMap }">
          <MapToggle
            :is-active="hasMapToggle"
            :is-toggled-right-override="mapIsToggledRight"
            @toggle-status="mapToggledRightHandler"
          />

          <MapScale :is-other-scale="mapIsToggledRight" />
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
          @step-enter="scrollamaStepEnterHandler"
          @step-exit="scrollamaStepExitHandler"
        >
          <div
            id="Einleitung"
            class="step anchor is-scroll-active"
          >
            <cEinleitung />
          </div>

          <div
            id="Ueberversorgt"
            class="step anchor"
          >
            <cUeberversorgt />
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
            <TheCaseStudySelector
              v-if="isMapLoaded"
              @current-case-study="currentCaseStudyHandler"
            />
          </div>

          <div
            id="impressum"
            class="step"
          >
            <h2 style="margin-bottom: 0;">
              Impressum
            </h2>

            <div class="columns">
              <cImpressum class="column" />
              <cDaten class="column" />
            </div>
          </div>
        </Scrollama>
      </article>
    </div>
  </div>
</template>


<script>
import mapColorScales from '~/assets/json/map-color-scales.json'

import anchorElements from '~/mixins/anchorElements'

import TheNavMain from '~/components/TheNavMain.vue'
import TheNavMeta from '~/components/TheNavMeta.vue'
import TheCaseStudySelector from '~/components/TheCaseStudySelector.vue'
import BarTop from '~/components/BaseBarTop.vue'
import BarBottomMap from '~/components/BaseBarBottomMap.vue'
import MapScale from '~/components/BaseMapScale.vue'
import MapToggle from '~/components/BaseMapToggle.vue'

import cIntro from '~/components/content/cIntro.vue'
import cEinleitung from '~/components/content/cEinleitung.vue'
import cUeberversorgt from '~/components/content/cUeberversorgt.vue'
import cZugangGesundheitseinrichtungen from '~/components/content/cZugangGesundheitseinrichtungen.vue'
import cZugangGesundheitseinrichtungenUndEinkommen from '~/components/content/cZugangGesundheitseinrichtungenUndEinkommen.vue'
import cStadtteileEinkommensgruppeHoch from '~/components/content/cStadtteileEinkommensgruppeHoch.vue'
import cStadtteileEinkommensgruppeMittel from '~/components/content/cStadtteileEinkommensgruppeMittel.vue'
import cStadtteileEinkommensgruppeNiedrig from '~/components/content/cStadtteileEinkommensgruppeNiedrig.vue'
import cStadtteileEinkommensgruppeAlle from '~/components/content/cStadtteileEinkommensgruppeAlle.vue'
import cCaseStudies from '~/components/content/cCaseStudies.vue'
import cImpressum from '~/components/content/cImpressum.vue'
import cDaten from '~/components/content/cDaten.vue'

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
    cEinleitung,
    cUeberversorgt,
    cZugangGesundheitseinrichtungen,
    cZugangGesundheitseinrichtungenUndEinkommen,
    cStadtteileEinkommensgruppeHoch,
    cStadtteileEinkommensgruppeMittel,
    cStadtteileEinkommensgruppeNiedrig,
    cStadtteileEinkommensgruppeAlle,
    cCaseStudies,
    cImpressum,
    cDaten
  },

  mixins: [anchorElements],

  data() {
    return {
      hasPointerEvents: false,

      isIntro: true,
      isCaseStudy: false,
      currentselectedcasestudy: '',

      hasBarBottomMap: false,
      hasMapToggle: false,
      mapIsToggledRight: true,
      isMapInit: false,
      isMapLoaded: false,
      thisMap: {},
      mapLayerIDsMain: [],
      mapLayerIDsCaseStudyBorders: [],

      doAtZoomEnd: Function,

      maxBounds_germany: [[3.9, 46.7], [16, 55.8]],
      bounds_germany: [[4, 47], [15.9, 55]],
      maxBounds_hamburg: [[9.55, 53.3], [10.4, 53.8]],
      bounds_hamburg: [[9.6, 53.378], [10.37, 53.753]],
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
      mapBoxOptions: {
        style: 'mapbox://styles/fabianschrader/cjqxr8akj0qsm2rs1lvj6xwqw',
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
      this.mapBoxOptions.bounds = this.bounds_germany
    })
  },

  methods: {
    scrollamaStepExitHandler({ element, index, direction }) {
      if (this.isMapInit && this.isMapLoaded) {
        element.classList.remove('is-scroll-active')
      }
    },

    scrollamaStepEnterHandler({ element, index, direction }) {
      // only do this stuff if map is done init and loading
      if (this.isMapInit && this.isMapLoaded) {
        element.classList.add('is-scroll-active')

        switch (element.id) {
          default:
          case 'Einleitung':
            this.thisMap.fitBounds(this.bounds_germany)

            this.setLayerOpacity('all', false)
            this.setLayerOpacity('borders', false, 'line-opacity')
            this.hasBarBottomMap = false
            this.hasMapToggle = false
            this.isCaseStudy = false
            break

          case 'Ueberversorgt':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('borders', true, 'line-opacity')
            this.hasBarBottomMap = false
            this.hasMapToggle = false
            this.isCaseStudy = false
            break

          case 'ZugangGesundheitseinrichtungen':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.mapToggledRightHandler(true)
            this.hasBarBottomMap = true
            this.hasMapToggle = false
            this.isCaseStudy = false
            break

          case 'ZugangGesundheitseinrichtungenUndEinkommen':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('einkommensgruppeOben', false)
            this.setLayerOpacity('einkommensgruppeMittel', false)
            this.setLayerOpacity('einkommensgruppeUnten', false)
            this.setLayerOpacity('einkommensgruppeAlle', false)

            this.mapToggledRightHandler(false)

            this.hasBarBottomMap = true
            this.hasMapToggle = true
            this.isCaseStudy = false
            break

          case 'StadtteileEinkommensgruppeHoch':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('zugangskarte', false)
            this.setLayerOpacity('einkommenskarte', false)

            this.setLayerOpacity('einkommensgruppeOben')
            this.setLayerOpacity('einkommensgruppeMittel', false)
            this.setLayerOpacity('einkommensgruppeUnten', false)
            this.setLayerOpacity('einkommensgruppeAlle', false)

            this.hasBarBottomMap = false
            this.hasMapToggle = false
            this.isCaseStudy = false
            break

          case 'StadtteileEinkommensgruppeMittel':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('zugangskarte', false)
            this.setLayerOpacity('einkommenskarte', false)

            this.setLayerOpacity('einkommensgruppeOben', false)
            this.setLayerOpacity('einkommensgruppeMittel')
            this.setLayerOpacity('einkommensgruppeUnten', false)
            this.setLayerOpacity('einkommensgruppeAlle', false)

            this.hasBarBottomMap = false
            this.hasMapToggle = false
            this.isCaseStudy = false
            break

          case 'StadtteileEinkommensgruppeNiedrig':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('zugangskarte', false)
            this.setLayerOpacity('einkommenskarte', false)

            this.setLayerOpacity('einkommensgruppeOben', false)
            this.setLayerOpacity('einkommensgruppeMittel', false)
            this.setLayerOpacity('einkommensgruppeUnten')
            this.setLayerOpacity('einkommensgruppeAlle', false)

            this.hasBarBottomMap = false
            this.hasMapToggle = false
            this.isCaseStudy = false
            break

          case 'StadtteileEinkommensgruppeAlle':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('zugangskarte', false)
            this.setLayerOpacity('einkommenskarte', false)

            this.setLayerOpacity('einkommensgruppeOben', false)
            this.setLayerOpacity('einkommensgruppeMittel', false)
            this.setLayerOpacity('einkommensgruppeUnten', false)
            this.setLayerOpacity('einkommensgruppeAlle')

            this.setLayerVisibility('caseStudies', false)

            this.hasBarBottomMap = false
            this.hasMapToggle = false
            this.isCaseStudy = false
            break

          case 'CaseStudies':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('einkommensgruppeOben', false)
            this.setLayerOpacity('einkommensgruppeMittel', false)
            this.setLayerOpacity('einkommensgruppeUnten', false)
            this.setLayerOpacity('einkommensgruppeAlle', false)

            this.setLayerVisibility('caseStudies')

            this.mapToggledRightHandler(false)

            this.hasBarBottomMap = true
            this.hasMapToggle = true
            this.isCaseStudy = true
            break

          case 'impressum':
            this.thisMap.fitBounds(this.bounds_hamburg)

            this.setLayerOpacity('all', false)

            this.hasBarBottomMap = true
            this.hasMapToggle = true
            this.isCaseStudy = true
            break
        }
      }
    },

    addColorScale(get, colorScale) {
      return {
        'fill-color': ['interpolate', ['linear'], ['get', get], ...colorScale],
        'fill-opacity': 0,
        'fill-opacity-transition': {
          duration: 500
        }
      }
    },

    setLayerVisibility(layerID, isVisible = true) {
      if (layerID === 'caseStudies') {
        this.mapLayerIDsCaseStudyBorders.forEach(lid => {
          this.thisMap.setLayoutProperty(
            lid,
            'visibility',
            isVisible ? 'visible' : 'none'
          )
        })
      } else {
        this.thisMap.setLayoutProperty(
          layerID,
          'visibility',
          isVisible ? 'visible' : 'none'
        )
      }
    },

    setLayerOpacity(layerID, isVisible = true, opacityType = 'fill-opacity') {
      if (layerID === 'all') {
        this.mapLayerIDsMain.forEach(lid => {
          this.thisMap.setPaintProperty(lid, opacityType, isVisible ? 1 : 0)
        })
      } else {
        this.thisMap.setPaintProperty(layerID, opacityType, isVisible ? 1 : 0)
      }
    },

    mapToggledRightHandler(status) {
      this.mapIsToggledRight = status

      if (!status) {
        this.setLayerOpacity('zugangskarte')
        this.setLayerOpacity('einkommenskarte')
      } else {
        this.setLayerOpacity('zugangskarte')
        this.setLayerOpacity('einkommenskarte', false)
      }
    },

    currentCaseStudyHandler(stadtteilName) {
      console.log('stadtteilName', stadtteilName)

      switch (stadtteilName) {
        default:
        case 'Blankenese':
          this.setLayerOpacity(
            'borders-casestudies-blankenese',
            true,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-einmsbuettel',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billstedt',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billbrook',
            false,
            'line-opacity'
          )
          break

        case 'Eimsbüttel':
          this.setLayerOpacity(
            'borders-casestudies-blankenese',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-einmsbuettel',
            true,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billstedt',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billbrook',
            false,
            'line-opacity'
          )
          break

        case 'Billstedt':
          this.setLayerOpacity(
            'borders-casestudies-blankenese',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-einmsbuettel',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billstedt',
            true,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billbrook',
            false,
            'line-opacity'
          )
          break

        case 'Billbrook':
          this.setLayerOpacity(
            'borders-casestudies-blankenese',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-einmsbuettel',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billstedt',
            false,
            'line-opacity'
          )
          this.setLayerOpacity(
            'borders-casestudies-billbrook',
            true,
            'line-opacity'
          )
          break

        case '':
          console.log('nothing happening')
          break
      }
    },

    mapZoomStart() {},

    mapZoomEnd() {
      return this.doAtZoomEnd()
    },

    mapInitialized(map) {
      console.log('map init')
      this.thisMap = map
      this.isMapInit = true
    },

    mapLoaded(map) {
      const layerIDsMain = []
      const layerIDsCaseStudyBorders = []

      // Add Source
      this.thisMap.addSource('hamburg_stadtteile_final', {
        type: 'vector',
        url: 'mapbox://fabianschrader.cjr2axwsk02kx31psxt4f1tfv-8mljy'
      })

      // Add Layers
      if (typeof this.thisMap.getLayer('zugangskarte') === 'undefined') {
        this.thisMap.addLayer({
          id: 'zugangskarte',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'fill',
          layout: {
            visibility: 'visible'
          },
          paint: this.addColorScale(
            'VH_Einwohner_Summe HCI',
            mapColorScales.zugangskarte
          )
        })

        layerIDsMain.push('zugangskarte')
      }

      if (typeof this.thisMap.getLayer('einkommenskarte') === 'undefined') {
        this.thisMap.addLayer({
          id: 'einkommenskarte',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'fill',
          layout: {
            visibility: 'visible'
          },
          paint: this.addColorScale(
            'Gesamtbetrag der Einkünfte',
            mapColorScales.einkommenskarte
          )
        })

        layerIDsMain.push('einkommenskarte')
      }

      if (
        typeof this.thisMap.getLayer('einkommensgruppeOben') === 'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'einkommensgruppeOben',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'fill',
          layout: {
            visibility: 'visible'
          },
          paint: this.addColorScale(
            'Gesamtbetrag der Einkünfte',
            mapColorScales.einkommensgruppeOben
          )
        })

        layerIDsMain.push('einkommensgruppeOben')
      }

      if (
        typeof this.thisMap.getLayer('einkommensgruppeMittel') === 'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'einkommensgruppeMittel',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'fill',
          layout: {
            visibility: 'visible'
          },
          paint: this.addColorScale(
            'Gesamtbetrag der Einkünfte',
            mapColorScales.einkommensgruppeMittel
          )
        })

        layerIDsMain.push('einkommensgruppeMittel')
      }

      if (
        typeof this.thisMap.getLayer('einkommensgruppeUnten') === 'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'einkommensgruppeUnten',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'fill',
          layout: {
            visibility: 'visible'
          },
          paint: this.addColorScale(
            'Gesamtbetrag der Einkünfte',
            mapColorScales.einkommensgruppeUnten
          )
        })

        layerIDsMain.push('einkommensgruppeUnten')
      }

      if (
        typeof this.thisMap.getLayer('einkommensgruppeAlle') === 'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'einkommensgruppeAlle',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'fill',
          layout: {
            visibility: 'visible'
          },
          paint: this.addColorScale(
            'Gesamtbetrag der Einkünfte',
            mapColorScales.einkommensgruppeAlle
          )
        })

        layerIDsMain.push('einkommensgruppeAlle')
      }

      if (typeof this.thisMap.getLayer('borders') === 'undefined') {
        this.thisMap.addLayer({
          id: 'borders',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'line',
          layout: {
            visibility: 'visible'
          },
          paint: {
            'line-width': 1,
            'line-color': '#d9d9d9',
            'line-opacity': 1
          }
        })
      }

      if (
        typeof this.thisMap.getLayer('borders-casestudies-blankenese') ===
        'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'borders-casestudies-blankenese',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'line',
          layout: {
            visibility: 'none'
          },
          paint: {
            'line-width': 5,
            'line-color': [
              'match',
              ['get', 'stadtteil'],
              ['Blankenese'],
              'hsla(144, 76%, 66%, 0.9)',
              'hsla(314, 94%, 28%, 0)'
            ],
            'line-opacity': 0
          }
        })
        layerIDsCaseStudyBorders.push('borders-casestudies-blankenese')
      }

      if (
        typeof this.thisMap.getLayer('borders-casestudies-einmsbuettel') ===
        'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'borders-casestudies-einmsbuettel',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'line',
          layout: {
            visibility: 'none'
          },
          paint: {
            'line-width': 5,
            'line-color': [
              'match',
              ['get', 'stadtteil'],
              ['Eimsbüttel'],
              'hsla(144, 76%, 66%, 0.9)',
              'hsla(314, 94%, 28%, 0)'
            ],
            'line-opacity': 0
          }
        })
        layerIDsCaseStudyBorders.push('borders-casestudies-einmsbuettel')
      }

      if (
        typeof this.thisMap.getLayer('borders-casestudies-billstedt') ===
        'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'borders-casestudies-billstedt',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'line',
          layout: {
            visibility: 'none'
          },
          paint: {
            'line-width': 5,
            'line-color': [
              'match',
              ['get', 'stadtteil'],
              ['Billstedt'],
              'hsla(144, 76%, 66%, 0.9)',
              'hsla(314, 94%, 28%, 0)'
            ],
            'line-opacity': 0
          }
        })
        layerIDsCaseStudyBorders.push('borders-casestudies-billstedt')
      }

      if (
        typeof this.thisMap.getLayer('borders-casestudies-billbrook') ===
        'undefined'
      ) {
        this.thisMap.addLayer({
          id: 'borders-casestudies-billbrook',
          'source-layer': 'hamburg_stadtteile_final',
          source: 'hamburg_stadtteile_final',
          type: 'line',
          layout: {
            visibility: 'none'
          },
          paint: {
            'line-width': 5,
            'line-color': [
              'match',
              ['get', 'stadtteil'],
              ['Billbrook'],
              'hsla(144, 76%, 66%, 0.9)',
              'hsla(314, 94%, 28%, 0)'
            ],
            'line-opacity': 0
          }
        })
        layerIDsCaseStudyBorders.push('borders-casestudies-billbrook')
      }

      this.isMapLoaded = true
      this.mapLayerIDsMain = layerIDsMain
      this.mapLayerIDsCaseStudyBorders = layerIDsCaseStudyBorders
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s $easeOutQuint;
  background: #fff;

  &.is-intro {
    .bar-top {
      transform: translateY(#{-$margin * 8});
    }

    .content {
      .intro {
        transform: translateY(0);
      }

      /* article {
        opacity: 0;
      } */

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
      -webkit-overflow-scrolling: touch;
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
        z-index: -1;
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

      @include from($max-side-width-break) {
        width: $max-side-width;
      }

      .step {
        display: block;
        padding-bottom: $margin * 6;
        padding-top: $margin * 6;
        max-width: $max-side-width;
        opacity: 0.1;
        transition: opacity 0.75s $easeOutQuint;
        pointer-events: none;

        &.is-scroll-active {
          opacity: 1;
          pointer-events: all;
          /* transform: translateX(2em); */
        }

        &#impressum {
          position: relative;
          min-height: 100vh;
          width: 100vw;
          max-width: unset;
          margin-left: -3.2rem;
          padding-left: 3.2rem;
          padding-right: 3.2rem;
          background: #fff;

          &::before {
            content: '';
            position: absolute;
            width: 100%;
            left: 0;
            top: -150px;
            height: 150px;
            background: $white-gradient-to-top;
            z-index: 1;
            pointer-events: none;
          }
        }
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

      @include from($max-side-width-break) {
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
        background: $white-gradient-to-right;
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
