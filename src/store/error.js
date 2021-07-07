export default ({
  state: {
    error: null
  },
  mutations: {
    setError(state) {
      state.error = 'Error: network error'
    }
  },
  actions: {
    setError({commit}) {
      commit('setError')
    }
  },
  getters: {
    getError(state) {
      return state.error
    }
  }
})