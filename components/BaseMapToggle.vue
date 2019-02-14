<template>
  <div
    class="map-toggle"
    :class="{
      'is-active': isActive,
      'is-toggled': isToggled
    }"
    @click.prevent="toggle()"
  >
    <span class="left">
      Einkommen
    </span>

    <div class="switch" />

    <span class="right">
      Zugang
    </span>
  </div>
</template>


<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      isToggled: false
    }
  },

  methods: {
    toggle() {
      this.isToggled = !this.isToggled
      this.$emit('toggle-status', this.isToggled)
    }
  }
}
</script>



<style lang="scss" scoped>
.map-toggle {
  $height-switch: 1.25em;

  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  font-weight: 500;
  padding: 0.25em 0.5em;
  background: #fff;
  margin-right: 1em;
  transform: translateY(4em);
  transition: transform 0.75s $easeOutQuint;
  cursor: pointer;
  @extend %box-shadow;
  @extend %border;
  @extend %border-radius;

  &:focus,
  &:hover {
    background: darken(#fff, 5%);
  }

  &.is-active {
    transform: translateY(0);
    transition: transform 0.75s $easeOutBack;
  }

  &.is-toggled {
    .switch {
      &::before {
        transform: translateX($height-switch);
      }
    }

    .left {
      opacity: 0.5;
    }

    .right {
      opacity: 1;
    }
  }

  .switch {
    position: relative;
    border-radius: 10em;
    border: 2px solid $gray;
    height: $height-switch;
    width: $height-switch * 2;
    margin: 0 0.5em;

    &::before {
      content: '';
      border-radius: 1em;
      position: absolute;
      width: $height-switch / 2;
      height: $height-switch / 2;
      background: $black;
      top: $height-switch / 6;
      left: $height-switch / 6;
      transform: translateX(0);
      transition: transform 0.5s $easeOutQuint;
    }
  }

  .left {
    opacity: 1;
  }

  .right {
    opacity: 0.5;
  }
}
</style>
