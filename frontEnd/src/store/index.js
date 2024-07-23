import { createStore } from 'vuex'
import actions from './actions';
import getters from  './getters';
import  mutations from './mutations';

export default createStore({
  state: {
      graphData: null,
      loading: false,
      error: null,
  },
  getters,
  mutations,
  actions,
})
