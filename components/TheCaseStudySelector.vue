<template>
  <div>
    <nav class="stadtteile-nav">
      <ul>
        <li
          v-for="(stadtteil, i) in stadtteile"
          :key="i"
        >
          <a
            href="#"
            :class="{ 'is-active': stadtteil.isActive }"
            @click.prevent="selectStadtteil(i)"
          >
            <span>
              {{ stadtteil.name }}
            </span>
            <img
              :src="stadtteil.img"
              :alt="`Stadtteil: ${stadtteil.name}`"
            >
          </a>
        </li>
      </ul>
    </nav>

    <div class="stadtteile-text">
      <div
        class="stadtteile-text-wrapper"
        :style="{ transform: `translateX(${-selectedStadtteil * (100/5)}%)` }"
      >
        <ccsBlankenese />
        <ccsEimsbuettel />
        <ccsBillstedt />
        <ccsVeddel />
        <ccsBillbrook />
      </div>
    </div>
  </div>
</template>


<script>
import ccsBillbrook from '~/components/content/cCaseStudiesContent/ccsBillbrook.vue'
import ccsBillstedt from '~/components/content/cCaseStudiesContent/ccsBillstedt.vue'
import ccsBlankenese from '~/components/content/cCaseStudiesContent/ccsBlankenese.vue'
import ccsEimsbuettel from '~/components/content/cCaseStudiesContent/ccsEimsbuettel.vue'
import ccsVeddel from '~/components/content/cCaseStudiesContent/ccsVeddel.vue'

export default {
  components: {
    ccsBillbrook,
    ccsBillstedt,
    ccsBlankenese,
    ccsEimsbuettel,
    ccsVeddel
  },

  data() {
    return {
      selectedStadtteil: 0,
      stadtteile: [
        {
          name: 'Blankenese',
          img: '/pics/stadtteil-blankenese.svg',
          isActive: false
        },
        {
          name: 'Eimsbüttel',
          img: '/pics/stadtteil-eimsbuettel.svg',
          isActive: false
        },
        {
          name: 'Billstedt',
          img: '/pics/stadtteil-billstedt.svg',
          isActive: false
        },
        {
          name: 'Veddel',
          img: '/pics/stadtteil-veddel.svg',
          isActive: false
        },
        {
          name: 'Billbrook',
          img: '/pics/stadtteil-billbrook.svg',
          isActive: false
        }
      ]
    }
  },

  watch: {
    selectedStadtteil(val, oldVal) {
      this.stadtteile[oldVal].isActive = false
      this.stadtteile[val].isActive = true
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.stadtteile[this.selectedStadtteil].isActive = true
    })
  },

  methods: {
    selectStadtteil(val) {
      this.selectedStadtteil = val
    }
  }
}
</script>


<style lang="scss" scoped>
.stadtteile-nav {
  margin: 3em 0 2em;

  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    border-bottom: 2px solid $gray;

    li {
      width: (100/3) * 1%;
      /* min-width: 3em; */
      max-width: 6em;
      padding: 0.5em;

      @include reallywidescreen {
        width: (100/5) * 1%;
        max-width: unset;
        /* min-width: 5em; */
      }

      a {
        font-size: 0.6em;
        display: block;
        color: $black;
        opacity: 0.5;
        text-decoration: none;

        &.is-active,
        &:focus,
        &:hover {
          opacity: 1;
        }

        span {
          text-align: center;
          display: block;
          width: 100%;
          font-weight: bold;
        }

        img {
          width: 100%;
        }
      }
    }
  }
}

.stadtteile-text {
  display: block;
  width: 100%;
  overflow: hidden;

  .stadtteile-text-wrapper {
    width: 500%;
    display: inline-flex;
    transform: translateX(0);
    transition: transform 1s $easeOutQuint;

    section {
      width: (100/5) * 1%;
      display: inline-block;
      padding-right: 1em;
    }
  }
}
</style>
