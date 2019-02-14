<template>
  <div id="nav-main">
    <div
      v-show="isNavOpen"
      class="overlay"
      @click="closeNav()"
    />

    <scrollactive
      class="nav-main"
      :class="{ 'is-nav-open': isNavOpen }"
      :duration="750"
      :offset="0"
      :style="[
        isNavOpen
          ? {'height': anchs.length * 2.5 + 0.1 + 'rem'}
          : ''
      ]"
      bezier-easing-value="0.23, 1, 0.32, 1"
      always-track
      @itemchanged="onItemChanged"
    >
      <div
        class="clicker"
        @click="openNav()"
      />

      <ul
        class="nav"
        :style="{
          'height': anchs.length * 2.5 + 'rem' ,
          'transform': `translateY(${isNavOpen ? 0 : (currAnchId * 2.5 * -1)}rem`
        }"
      >
        <li
          v-for="(anch, i) in anchs"
          :key="i"
        >
          <a
            :href="`#${anch.id}`"
            class="scrollactive-item"
            @click.prevent="closeNav()"
          >
            {{ ('0' + (i + 1)).slice(-2) }} — {{ anch.title }}
          </a>
        </li>
      </ul>

      <div class="chevron">
        <span>></span>
      </div>
    </scrollactive>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      anchs: [],
      currAnchId: 0,
      isNavOpen: Boolean
    }
  },

  computed: {
    ...mapState(['anchors'])
  },

  watch: {
    anchors(val) {
      this.anchs = val
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.isNavOpen = false
    })
  },

  methods: {
    onItemChanged(event, currentItem, lastActiveItem) {
      // change active nav item
      if (this.anchs.length > 0) {
        const currAnchIdName = currentItem.hash.substring(1)

        const foundId = this.anchs.findIndex(el => el.id === currAnchIdName)
        this.currAnchId = foundId
      }
    },

    openNav() {
      this.isNavOpen = true
    },

    closeNav() {
      this.isNavOpen = false
    }
  }
}
</script>


<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(#fff, 0.5);
  cursor: pointer;
  z-index: -1;
}

.nav-main {
  position: relative;
  display: flex;
  background: #fff;
  overflow: hidden;
  height: 2.2em;
  transition: height 0.3s $easeOutQuint;
  @extend %box-shadow;
  @extend %border;
  @extend %border-radius;

  &.is-nav-open {
    height: unset;

    .clicker {
      display: none;
    }

    ul.nav {
      li {
        a {
          &.is-active {
            background: darken(#fff, 5%);
          }

          &:after {
            opacity: 1;
          }
        }
      }
    }

    .chevron {
      span {
        transform: rotate(270deg);
      }
    }
  }

  .clicker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: aqua; */
    z-index: 10;
    cursor: pointer;
  }

  .chevron {
    position: absolute;
    top: 0;
    right: 0;
    width: 2em;
    height: 2em;
    /* background: red; */
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    span {
      color: darken($gray, 20%);
      transform: rotate(90deg);
      transition: transform 0.5s $easeOutQuint;
    }
  }

  ul.nav {
    cursor: pointer;
    /* background: pink; */
    font-size: 0.6em;
    height: auto;
    display: block;
    transition: transform 0.3s $easeOutQuint;

    li {
      a {
        line-height: 1;
        position: relative;
        display: block;
        padding: $button-padding 6em $button-padding $button-padding;
        background: #fff;
        text-decoration: none;
        color: rgba($black, 0.7);
        font-weight: 500;
        @extend %is-uppercased;

        &:focus,
        &:hover {
          background: darken(#fff, 5%);
        }

        &.is-active {
          color: rgba($blue, 0.7);
        }

        &:after {
          content: '';
          position: absolute;
          height: 1px;
          left: 2em;
          right: 2em;
          bottom: -1px;
          background: $gray;
          transition: opacity 0.6s $easeOutQuint;
          opacity: 0;
          z-index: 1;
        }
      }
    }
  }
}
</style>
