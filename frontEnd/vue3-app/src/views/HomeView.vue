<template>
  <div>
    <HierarchyChart v-if="!loading && !error" :data="treeData.items[0]" />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import gql from "graphql-tag"
import HierarchyChart from '@/components/HierarchyChart.vue';

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
  name: 'HomeView',
  components: {
    HierarchyChart
  },
  setup() {
    const { result, loading, error } = useQuery(GET_HIERARCHY);

    return {
      treeData: result,
      loading,
      error
    };
  }
};
</script>