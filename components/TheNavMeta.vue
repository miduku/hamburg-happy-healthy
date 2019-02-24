<template>
  <scrollactive
    class="nav-meta"
    :duration="750"
    :offset="0"
    bezier-easing-value="0.23, 1, 0.32, 1"
  >
    <ul class="button-group nav">
      <li>
        <a
          href="#"
          @click.stop.prevent="$emit('click-intro')"
        >
          Über das Projekt
        </a>
      </li>

      <li>
        <a
          href="#impressum"
          class="scrollactive-item"
        >
          Impressum
        </a>
      </li>
    </ul>
  </scrollactive>
</template>
