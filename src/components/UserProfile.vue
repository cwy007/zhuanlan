<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img :src="fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail">
      <div class="detail ml-2">
        <h6 class="mb-0">{{user.nickName}}</h6>
        <span class="d-block text-truncate text-muted">{{user.description}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { UserProps } from '@/store'
import { addColumnAvatar } from '@/helpers'

export default defineComponent({
  name: 'UserProfile',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props) {
    const fitUrl = computed(() => {
      addColumnAvatar(props.user, 50, 50)
      const { avatar } = props.user
      return avatar && avatar.fitUrl
    })
    return {
      fitUrl
    }
  }
})
</script>

<style scoped>
.user-profile-component .img {
  width: 50px;
  height: 50px;
}
</style>
