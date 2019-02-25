<template>
  <div
    class="scales"
    :class="{ 'is-other-scale': isOtherScale }"
  >
    <div class="scale-einkommen">
      <div class="scale-title">
        Einkommen
      </div>
      <div class="scale-content">
        <div class="left">
          13.777
        </div>
        <div class="right">
          120.716
        </div>
      </div>
    </div>

    <div class="scale-person-gesundheitseinrichtungen">
      <div class="scale-title">
        Personen pro Gesundheitseinrichtungen
      </div>
      <div class="scale-content">
        <div class="left">
          4.020
        </div>
        <div class="left-65">
          1.385
        </div>
        <div class="right">
          1
        </div>
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
  min-width: 300px;
  height: $size-20;
  /* border: 2px solid $gray; */
  border-radius: 100px;
  font-size: 0.6em;
  font-weight: 500;
  @extend %box-shadow;

  .scale-einkommen,
  .scale-person-gesundheitseinrichtungen {
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: opacity 0.75s $easeOutQuint;

    .scale-title {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 105%;
      text-align: center;
      font-weight: bold;
      text-shadow: 0px 0px 4px rgba(#fff, 1), 0px 0px 4px rgba(#fff, 1),
        0px 0px 4px rgba(#fff, 1);
      /* font-size: 0.8em; */
      /* line-height: 1; */
    }

    .scale-content {
      $padding-side: 3.6%;

      div {
        position: absolute;
        top: 0.25em;

        &.left {
          text-align: left;
          left: $padding-side;
        }

        &.left-65 {
          text-align: left;
          /* color: $whisper; */
          left: 65.67164%;
        }

        &.right {
          text-align: right;
          color: $whisper;
          right: $padding-side;
        }
      }
    }
  }

  &.is-other-scale {
    .scale-person-gesundheitseinrichtungen {
      opacity: 1;
    }

    .scale-einkommen {
      opacity: 0;
    }
  }

  .scale-person-gesundheitseinrichtungen {
    opacity: 0;
    /* background: linear-gradient(to right, #fff 65.67164%, #034e7b 100%); */
    background: linear-gradient(
      gradient-fn(
        4020,
        to right,
        (
          (#fff, 4020),
          (#f1eef6, 1385),
          (#d0d1e6, 1383),
          (#a6bddb, 1153),
          (#74a9cf, 923),
          (#3690c0, 693),
          (#0570b0, 463),
          (#034e7b, 233),
          (#034e7b, 1),
          (#000, 0)
        )
      )
    );
    /* background: linear-gradient(
      to right,
      #fff 0%,
      #fff 12.5%,
      #f1eef6 25%,
      #d0d1e6 37.5%,
      #a6bddb 50%,
      #74a9cf 62.5%,
      #3690c0 75%,
      #0570b0 87.5%,
      #034e7b 100%
    ); */
  }

  .scale-einkommen {
    opacity: 1;
    background: linear-gradient(
      gradient-fn(
        111000,
        to left,
        (
          (#7a0177, 111000),
          (#aa017e, 97200),
          (#de3697, 83314),
          (#f768a1, 69428),
          (#fa9fb5, 55542),
          (#fcc5c0, 41657),
          (#fde0dd, 27771),
          (#fff7f3, 13777),
          (#fff7f3, 0)
        )
      )
    );
  }
  /* .scale-einkommen {
    opacity: 1;
    background: linear-gradient(
      to right,
      #fff7f3 0%,
      #fff7f3 12.5%,
      #fde0dd 25%,
      #fcc5c0 37.5%,
      #fa9fb5 50%,
      #f768a1 62.5%,
      #de3697 75%,
      #aa017e 87.5%,
      #7a0177 100%
    );
  } */
}
</style>
