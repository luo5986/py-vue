import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leftOne:null,
    leftTwo:null,
    rightOne:null,
    rightTwo:null,
    typeList:null,
    filmList:null,
    lastList:null
  },
  mutations: {
    initLeftOne(state, val) {
      state.leftOne = val
    },
    initLeftTwo(state, val) {
      state.leftTwo = val
    },
    initRightOne(state, val) {
      state.rightOne = val
    },
    initRightTwo(state, val) {
      state.rightTwo = val
    },


    initType(state, val) {
      state.typeList = val
    },
    initFilm(state, val) {
      state.filmList = val
    },
    initLast(state, val) {
      state.lastList = val
    },
  },
  actions: {},
  modules: {}
})
