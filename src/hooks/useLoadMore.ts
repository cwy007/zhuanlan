// ComputedRef 为函数 computed 返回的数据类型
import { ref, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'

interface LoadParams {
  currentPage: number;
  pageSize: number;
}

const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParams = { currentPage: 2, pageSize: 5 }
) => {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => ({
    currentPage: currentPage.value, // 这里要使用响应式数据
    pageSize: params.pageSize
  }))
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value // 当前页面大于总数
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
