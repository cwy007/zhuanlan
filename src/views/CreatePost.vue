<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="{ uploadedData }">
        <img :src="uploadedData.data.url" alt="">
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="from-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="from-label">文章详情：</label>
        <validate-input
          tag="textarea"
          rows="10"
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章标题"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-lg mb-4">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store'
import { beforeUploadCheck } from '@/helpers'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup () {
    let imgId = ''
    const titleVal = ref('')
    const contentVal = ref('')
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式！', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片的大小不能超过1 Mb', 'error')
      }
      return passed
    }
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imgId = rawData.data._id
      }
    }
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)

      if (result) {
        const { column, _id: author } = store.state.user
        console.log('column', column)

        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author
          }
          if (imgId) {
            newPost.image = imgId
          }
          console.log('newPost', newPost)

          store.dispatch('createPost', newPost).then(() => {
            createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            }, 2000)
          })
        }
      }
    }

    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      uploadCheck,
      handleFileUploaded,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
.create-post-page >>> .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page >>> .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
