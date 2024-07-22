import { createStore } from 'vuex'
import actions from './actions';

export default createStore({
  state: {
      graphData: null,
      loading: false,
      error: null,
      selectedNode:{'data':{'name':'A'}}
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
    update_node(state, payload) {
      state.selectedNode = payload;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions,
})
