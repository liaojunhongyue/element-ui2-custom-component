import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMenu: storage.get('currentMenu') || {},
    formSettings: storage.get('formSettings') || []
  },
  mutations: {
    setCurrentMenu(state, data) {
      state.currentMenu = data;
      storage.set('currentMenu', data);
    },
    setFormSettings(state, data) {
      state.formSettings = data;
      storage.set('formSettings', data);
    }
  },
  getters: {
    getCurrentMenu: state => state.currentMenu,
    getFormSettings: state => state.formSettings
  }
})