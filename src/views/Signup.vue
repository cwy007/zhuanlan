<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="text-center my-4">注册者也账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules" v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          :rules="nickNameRules" v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules" v-model="formData.password"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          :rules="repeatPasswordRules" v-model="formData.repeatPassword"
          placeholder="请再次输入密码"
          type="password"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'Signup',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const nickNameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName
        }
        axios.post('/users', payload).then(() => {
          createMessage('注册成功', 'success')
          router.push('/login')
        }).catch(e => {
          createMessage(e.error, 'error')
        })
      }
    }
    return {
      formData,
      emailRules,
      nickNameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit
    }
  }
})

</script>

<style scoped>
.w-330 {
  max-width: 330px;
}
</style>
