<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <Loading v-if="isLoading" text="拼命加载中"></Loading>
    <message type="error" :message="error.message" v-if="error.status"></message>
    <router-view />
    <footer class="text-center py-4 text-muted bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/Globalheader.vue'
import Loading from '@/components/Loading.vue'
import { GlobalDataProps } from '@/store'
import Message from '@/components/Message.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loading,
    Message
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>
