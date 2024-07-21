<template>
  <div id="app">
    <D3Tree :data="treeData" />
    <!-- <HierarchyView/> -->
  </div>
</template>

<script>
import D3Tree from '@/components/HierarchyChart.vue';
// import  HierarchyView from '@/components/HierarchyView.vue';

export default {
  name: 'App',
  components: {
    D3Tree,
    // HierarchyView,
  },
  data() {
    return {
      treeData: {
        name: "A",
        description: "This is a description of A",
        children: [
          {
            name: "B",
            description: "This is a description of B",
            children: [
              {
                name: "B-1",
                description: "This is a description of B-1"
              },
              {
                name: "B-2",
                description: "This is a description of B-2"
              },
              {
                name: "B-3",
                description: "This is a description of B-3"
              }
            ]
          },
          {
            name: "C",
            description: "This is a description of C",
            children: []
          },
          {
            name: "D",
            description: "This is a description of D",
            children: []
          }
        ]
      }
    };
  }
};
</script>
