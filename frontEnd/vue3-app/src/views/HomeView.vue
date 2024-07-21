<template>
  <div>
    <HierarchyChart v-if="!loading && !error" :data="graphData.items[0]" />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HierarchyChart from '@/components/HierarchyChart.vue';
export default {
  name: 'HomeView',
  components: {
    HierarchyChart
  },
  computed: {
    ...mapGetters(['graphData', 'loading', 'error'])
  },
  created() {
    this.$store.dispatch('fetchGraphData');
  }
};
</script>