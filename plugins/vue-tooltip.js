// https://github.com/Akryum/v-tooltip
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip, {
  popover: {
    defaultHandleResize: true,
    defaultPlacement: 'right',
    defaultOffset: 16,
    defaultAutoHide: true
  }
})
