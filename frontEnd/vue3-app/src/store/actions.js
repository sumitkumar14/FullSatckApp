// src/store/actions.js
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
const GET_HIERARCHY = gql`
  query GetHierarchy {
    items {
      name
      description
      children {
        name
        description
        children {
          name
          description
        }
      }
    }
  }
`; 

export default {
  async fetchGraphData({ commit }) {
      commit('SET_LOADING', true);
      try {
        const {result} = await useQuery(GET_HIERARCHY);
        commit('SET_GRAPH_DATA', result);
      } catch (error) {
        commit('SET_ERROR', error);
      } finally {
        commit('SET_LOADING', false);
      }
    }
};