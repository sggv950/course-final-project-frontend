import Vue from 'vue'
import Vuex from 'vuex'
import eventsModule from './modules/event.module.js'
import userModule from './modules/user.module.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    eventsModule,
    userModule
  }
})
