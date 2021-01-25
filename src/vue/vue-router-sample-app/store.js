import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.config.devtools = false;

export default new Vuex.Store({
    modules: {},
    state: () => ({
      formUrl: null,
      recaptchaKey: null
    }),
    getters: {
      formUrl(state) {
        return state.formUrl;
      },
      recaptchaKey(state) {
        return state.recaptchaKey;
      }
    },
    mutations: {
      SET(state, payload) {
        state.formUrl = payload.formUrl;
        state.recaptchaKey = payload.recaptchaKey;
      }
    },
    actions: {
      setAppData({commit}, payload) {
        commit('SET', payload);
      }
    }
  });

