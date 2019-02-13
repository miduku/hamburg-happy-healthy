<template>
  <div
    class="scales"
    :class="{ 'is-other-scale': isOtherScale }"
  >
    <div class="scale-einkommen">
      <div class="left">
        10.000
      </div>
      <div class="center">
        Einkommen
      </div>
      <div class="right">
        20.185
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    isOtherScale: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>



<style lang="scss" scoped>
.scales {
  position: relative;
  width: (100/3) * 1%;
  max-width: 500px;
  height: $size-24;
  /* border: 2px solid $gray; */
  border-radius: 100px;
  @extend %box-shadow;

  > div {
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 0.8em;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    padding: 0 1.6em;
  }
}

.scale-einkommen {
  background: linear-gradient(
    to right,
    #fff7f3 12.5%,
    #fde0dd 25%,
    #fcc5c0 37.5%,
    #fa9fb5 50%,
    #f768a1 62.5%,
    #de3697 75%,
    #aa017e 87.5%,
    #7a0177 100%
  );

  div {
    flex-grow: 1;
    text-align: center;

    &.left {
      text-align: left;
    }

    &.center {
      transform: translateY(-1.6em);
      text-shadow: 0px 4px 8px rgba($black, 0.25);
    }

    &.right {
      text-align: right;
      color: $whisper;
    }
  }
}
</style>
