<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
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
        <!-- <img :src="uploadedData.data.url"> -->

        <div class="uploaded-area">
          <img :src="uploadedData.data && uploadedData.data.url">
          <h3>点击重新上传</h3>
        </div>
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
          placeholder="请输入文章详情，支持Markdown语法"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-lg mb-4">
          {{isEditMode ? '更新文章' : '发表文章'}}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
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
    const uploadedData = ref()
    let imgId = ''
    const titleVal = ref('')
    const contentVal = ref('')
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const isEditMode = !!route.query.id
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    watch(() => route.query.id, () => {
      if (!route.query.id) {
        uploadedData.value = {}
        titleVal.value = ''
        contentVal.value = ''
      }
    })
    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchPost', route.query.id).then((rawData: ResponseType<PostProps>) => {
          const currentPost = rawData.data
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image }
          }
          titleVal.value = currentPost.title
          contentVal.value = currentPost.content || ''
        })
      }
    })
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
      if (result) {
        const { column, _id: author } = store.state.user
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
          const actionName = isEditMode ? 'updatePost' : 'createPost'
          const sendData = isEditMode ? {
            id: route.query.id,
            payload: newPost
          } : newPost

          store.dispatch(actionName, sendData).then(() => {
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
      onFormSubmit,
      uploadedData,
      isEditMode
    }
  }
})
</script>

<style scoped>
.create-post-page >>> .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page >>> .file-upload-container .uploaded-area {
  height: 200px;
  position: relative;
}
.create-post-page >>> .file-upload-container .uploaded-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.create-post-page >>> .file-upload-container .uploaded-area h3 {
  display: none;
}
.create-post-page >>> .file-upload-container .uploaded-area:hover h3 {
  display: block;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
