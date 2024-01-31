import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import route from './modules/route'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    tagsView,
    route,
    permission,
    settings
  },
  getters
})

export default store
