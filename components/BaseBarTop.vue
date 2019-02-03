<template>
  <div class="bar-top">
    <slot />
  </div>
</template>


<style lang="scss" scoped>
.bar-top {
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: $margin * 2;
  /* background: rgba(burlywood, 0.5); */
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 20;

  > * {
    pointer-events: all;
  }
}
</style>
