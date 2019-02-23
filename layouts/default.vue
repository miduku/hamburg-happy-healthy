<template>
  <div>
    <div class="spinner">
      <div />
      <div />
      <div />
      <div />
    </div>

    <div class="width-warning">
      <p>Diese Website funktioniert nur auf 1024px breiten (oder größer) Bildschirmen.</p>
    </div>

    <nuxt />
  </div>
</template>


<style lang="scss" scoped>
.width-warning {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  @include from(1024px) {
    display: none;
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 50%;
    height: 2em;
    width: 2px;
    transform: translateY(-1em);
    background: $gray;
  }

  &::before {
    left: 5%;
  }

  &::after {
    right: 5%;
  }

  p {
    text-align: center;
    margin: 0 10%;
    padding: 0 2em;
    background: #fff;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 5%;
      width: 90%;
      height: 2px;
      /* transform: translateY(-0.75em); */
      background: $gray;
      z-index: -1;
    }
  }
}

.spinner {
  position: fixed;
  width: 100vw;
  height: 100vh;
  /* z-index: 999; */

  div {
    width: 10px;
    height: 10px;
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(5px);
    background-color: $blue;
    border-radius: 50%;
    animation: move 4s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);

    &:nth-child(2) {
      animation-delay: 150ms;
    }

    &:nth-child(3) {
      animation-delay: 300ms;
    }

    &:nth-child(4) {
      animation-delay: 450ms;
    }
  }
}

@keyframes move {
  0% {
    left: 0%;
  }
  75% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
