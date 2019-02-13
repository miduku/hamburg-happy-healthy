<template>
  <v-popover>
    <em class="info">
      <slot />
    </em>

    <template slot="popover">
      <h6>{{ title }}</h6>

      <div
        v-for="(c, i) in content"
        :key="i"
      >
        <p v-if="c.constructor !== Array">
          {{ c }}
        </p>

        <ul v-else>
          <li
            v-for="(li, ii) in c"
            :key="ii"
          >
            {{ li }}
          </li>
        </ul>
      </div>
    </template>
  </v-popover>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: Array,
      required: true
    }
  }
}
</script>
