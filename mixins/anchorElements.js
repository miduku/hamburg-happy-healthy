export default {
  methods: {
    createAnchors() {
      const sections = this.$el.querySelectorAll('.anchor')
      const anchs = []

      sections.forEach(section => {
        anchs.push({
          id: section.id,
          title: section.children[0].children[0].innerText
        })
      })

      this.storeAnchors(anchs)
    },

    storeAnchors(anchors) {
      this.$store.commit('SET_ANCHORS', anchors)
    }
  }
}
