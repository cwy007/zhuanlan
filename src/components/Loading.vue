<template>
  <teleport to="#loading">
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{ backgroundColor: background || ''}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{text || 'loading'}}</span>
        </div>
        <p v-if="text" class="text-primary small">{{text}}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    const node = document.createElement('div')
    node.id = 'loading'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style scoped>
.loading-container {
  background: rgba(0, 0, 0, .8);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
