import Vue from "vue"
import Vuex from 'vuex'
import notify from './notify'
import loading from './loading'
import error from './error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notify,
    loading,
    error
  }
})