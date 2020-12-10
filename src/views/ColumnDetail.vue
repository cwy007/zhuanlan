<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-4 text-center">
        <img :src="column.avatar.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-8">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
  </div>
  <post-list :list="list"></post-list>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import PostList from '@/components/PostList.vue'

export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const currentId = route.params.id
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      route,
      column,
      list
    }
  }
})
</script>

<style scoped>

</style>
