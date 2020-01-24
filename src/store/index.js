import Vue from 'vue'
import Vuex from 'vuex'

import me from './me'
import userInfo from './userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    me,
    userInfo,
  },
})
