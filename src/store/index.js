import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const state={
    cartList: [],
  // 是否开启请求加载
  isLoading: true
  }
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
