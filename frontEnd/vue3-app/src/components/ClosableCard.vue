<template>
    <div v-if="visible" class="card position-relative">
      <button
        type="button"
        class="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close"
        @click="closeCard"
      ></button>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ text }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        visible: true
      };
    },
    methods: {
      closeCard() {
        this.visible = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>