<template>
  <div class="post-detail-page">
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="modalIsVisible = false"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        v-if="currentImageUrl"
        :src="currentImageUrl"
        :alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
      >
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile
            v-if="typeof currentPost.author === 'object'"
            :user="currentPost.author"
          />
        </div>
        <span class="text-muted col text-end font-italic">
          发表于：{{currentPost.createdAt}}
        </span>
      </div>
      <div v-html="currentHTML"></div>
      <div class="btn-group mt-5">
        <router-link
          class="btn btn-success"
          :to="{name: 'create', query: { id: currentPost._id }}"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { GlobalDataProps, PostProps, ImageProps, UserProps } from '@/store'
import UserProfile from '@/components/UserProfile.vue'
import Modal from '@/components/Modal.vue'

export default defineComponent({
  name: 'PostDetail',
  components: {
    UserProfile,
    Modal
  },
  setup () {
    const modalIsVisible = ref(false)
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    const md = new MarkdownIt()
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content)
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (isLogin && currentPost.value && currentPost.value.author) {
        const postAuthor = currentPost.value.author as UserProps // 断言
        return postAuthor._id === _id
      }
      return false
    })
    return {
      currentPost,
      currentImageUrl,
      currentHTML,
      showEditArea,
      modalIsVisible
    }
  }
})
</script>

<style scoped>

</style>
