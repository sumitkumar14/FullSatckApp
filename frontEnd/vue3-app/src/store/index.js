import { createStore } from 'vuex'
import actions from './actions';

export default createStore({
  state: {
      graphData: null,
      loading: false,
      error: null
  },
  getters: {
    graphData: state => state.graphData,
    loading: state => state.loading,
    error: state => state.error
  },
  mutations: {
    SET_GRAPH_DATA(state, data) {
      state.graphData = data;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions,
})
