<template>
  <div
    class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
    :style="{ backgroundColor: background }"
  >
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{text || 'loading'}}</span>
      </div>
      <p v-if="text" class="text-primary small">{{text}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String,
      default: 'rgba(255, 255, 255, .5)'
    }
  }
})
</script>

<style scoped>
.loading-container {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
