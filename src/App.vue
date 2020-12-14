<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <Loading v-if="isLoading" text="拼命加载中"></Loading>
    <router-view />
    <footer class="text-center py-4 text-muted bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">
            <a class="text-muted" href="https://github.com/cwy007/zhuanlan" target="_blank">
              github source code
            </a>
          </li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/Globalheader.vue'
import Loading from '@/components/Loading.vue'
import { GlobalDataProps } from '@/store'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loading
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)

    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
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
