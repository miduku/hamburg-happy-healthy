<template>
  <div class="stadtteil-stats">
    <div class="versorgung">
      <span class="key">
        Versorgung
      </span>
      <span class="value">
        {{ versorgung }}
      </span>
    </div>

    <div class="einkommen">
      <span class="key">
        Einkommen
      </span>
      <span class="value">
        {{ einkommen }}
      </span>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    versorgung: {
      type: String,
      required: true
    },
    einkommen: {
      type: String,
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
.stadtteil-stats {
  .versorgung,
  .einkommen {
    margin-bottom: 0;

    .key {
      display: inline-block;
      min-width: 5.5em;
    }

    .value {
      display: block;
      margin-left: 1em;
      font-weight: bold;

      @include widescreen {
        display: inline-block;
      }
    }
  }

  .versorgung {
    .value {
      color: $blue;
    }
  }

  .einkommen {
    .value {
      color: $purple;
    }
  }
}
</style>
