<template>
  <v-popover>
    <em class="info">
      <slot />
    </em>

    <template slot="popover">
      <h6 v-if="title.length > 0">{{ title }}</h6>

      <div
        v-for="(cntnt, i) in content"
        :key="i"
      >
        <p
          v-if="cntnt.constructor !== Array"
          v-html="cntnt"
        />

        <ul v-else>
          <li
            v-for="(li, ii) in cntnt"
            :key="ii"
            v-html="li"
          />
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
      default: ''
    },
    content: {
      type: Array,
      required: true
    }
  }
}
</script>
