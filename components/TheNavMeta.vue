<template>
  <nav class="nav-meta">
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
        <a href="#">
          Impressum
        </a>
      </li>
    </ul>
  </nav>
</template>
