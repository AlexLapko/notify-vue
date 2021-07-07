import loadMore from "../assets/js/loadMore"
import axios from "axios"

export default ({
  state: {
    messages: [],
    messagesMain: []
  },
  mutations: {
    setMessage(state, payload) {
      state.messages = payload
    },
    setMessageMain(state, payload) {
      state.messagesMain = payload
    },
    loadMessages(state, payload) {
      state.messagesMain = [...state.messagesMain, ...payload]
    }
  },
  actions: {
    setMessage({commit}, payload) {
      commit('setMessage', payload)
    },
    setMessageMain({commit}, payload) {
      commit('setMessageMain', payload)
    },
    loadMessages({commit, getters}) {
      let res = getters.getMessageFilter 
      commit('loadMessages', loadMore(res, 3))
    },
    getNotifyLazy({dispatch}) {
      dispatch('setLoading', true)
      setTimeout(() => {
        dispatch('getNotify')
      }, 2000);
    },
    getNotify({commit, dispatch}) {
      dispatch('setLoading', true)
      axios
      .get('https://tocode.ru/static/_secret/courses/1/notifyApi.php')
      .then(reseponse => {
        let res = reseponse.data.notify,
          messages = [],
          messagesMain = []

        for(let i = 0; i < res.length; i++) {
          if(res[i].main) messagesMain.push(res[i])
          else messages.push(res[i])
        }
        
        commit('setMessage', messages)
        commit('setMessageMain', messagesMain)
      })
      .catch(() => {
        dispatch('setError')
      })
      .finally(() => {
        dispatch('setLoading', false)
      })
    }
  },
  getters: {
    getMessage (state) {
      return state.messages
    },
    getMessageFilter (state) {
      return state.messages.filter(mes => {
        return mes.main === false
      })
    },
    getMessageMain (state) {
      return state.messagesMain
    }
  }
})