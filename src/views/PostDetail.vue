<template>
  <div class="post-detail-page">
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
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { GlobalDataProps, PostProps, ImageProps } from '@/store'
import UserProfile from '@/components/UserProfile.vue'

export default defineComponent({
  name: 'PostDetail',
  components: { UserProfile },
  setup () {
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
    return {
      currentPost,
      currentImageUrl,
      currentHTML
    }
  }
})
</script>

<style scoped>

</style>
