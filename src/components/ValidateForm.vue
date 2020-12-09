<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Handler } from 'mitt'
export const emitter = mitt()
type ValidateFunc = () => boolean
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    // 引入 Handler 解决下面的问题
    // TS2769: No overload matches this call.
    const callback: Handler = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })

    return {
      submitForm
    }
  }
})
</script>

<style>

</style>
