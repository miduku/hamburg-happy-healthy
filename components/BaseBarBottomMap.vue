<template>
  <div class="bar-bottom-map">
    <slot />
  </div>
</template>


<style lang="scss" scoped>
.bar-bottom-map {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  width: 100%;
  height: $margin * 2;
  z-index: 3;
  pointer-events: none;

  > * {
    pointer-events: all;
  }
}
</style>
