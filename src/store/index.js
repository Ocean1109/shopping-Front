import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin:false
  },
  mutations: {
      changeLoginState(state, payload) {
          state.isLogin = payload.isLogin
      },
  },
  actions: {
  },
  modules: {
  }
})
