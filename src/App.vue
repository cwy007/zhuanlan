<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ColumnList from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/Globalheader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
import { testData } from './testData'

const currentUser: UserProps = {
  isLogin: true,
  name: 'viking'
}

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref<any>()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules = [
      { type: 'required', message: '密码不能为空' }
    ]
    // result 整个 form 的验证结果
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
    }

    return {
      list: testData,
      currentUser,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef
    }
  }
})
</script>
