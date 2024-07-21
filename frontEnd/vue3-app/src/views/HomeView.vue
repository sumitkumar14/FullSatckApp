<template>
  <div class="row">
    <div class="col-4"><ClosableCard ref="card" :title="title" :text="description" /></div>
    <div class="col-8"><HierarchyChart @selected-node="selectedNode" v-if="!loading && !error" :data="graphData.items[0]" />
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HierarchyChart from '@/components/HierarchyChart.vue';
import ClosableCard from '@/components/ClosableCard.vue';
export default {
  name: 'HomeView',
  components: {
    HierarchyChart,
    ClosableCard
  },
  data() {
    return {
      title: "A",
      description: "This is a description of A"
    }

  },
  computed: {
    ...mapGetters(['graphData', 'loading', 'error'])
  },
  methods: {
    selectedNode(node) {
     this.title = node.name;
     this.description = node.description;
     this.$refs.card.visible=true;
    }
  },

  created() {
    this.$store.dispatch('fetchGraphData');
  }
};
</script>