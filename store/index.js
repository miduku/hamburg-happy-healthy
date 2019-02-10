export const state = () => ({
  anchors: []
})

export const mutations = {
  SET_ANCHORS(state, payload) {
    state.anchors = payload
  }
}
