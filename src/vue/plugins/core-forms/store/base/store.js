import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.config.devtools = true;

/**
 * Dummy vuex store
 */
export default new Vuex.Store({
  modules: {},
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {}
});

