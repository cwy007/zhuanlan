import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  fitUrl?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: UserProps | string;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  token: string;
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: 'get' }
) => {
  const { data } = await axios(url, config)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false, column: '5f3e86d62c56ee13bb83096c' }
  },
  mutations: {
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    fetchPost (state, rawData) {
      state.posts = [rawData.data]
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    updatePost (state, { data }) {
      state.posts = state.posts.map(post => {
        return post._id === data._id ? data : post
      })
    },
    setLoading (state, rawData) {
      state.loading = rawData
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      state.user.isLogin = false
      delete axios.defaults.headers.common.Authorization
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser (state, rawData) {
      state.user = { ...state.user, isLogin: true, ...rawData.data }
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      return asyncAndCommit('columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchPost ({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
    },
    createPost ({ commit }, payload) {
      return asyncAndCommit('/posts', 'createPost', commit, {
        method: 'post',
        data: payload
      })
    },
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    },
    login ({ commit }, payload) {
      return asyncAndCommit('/user/login', 'login', commit, {
        method: 'post',
        data: payload
      })
    },
    fetchCurrentUser ({ commit }) {
      return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, payload) {
      return dispatch('login', payload).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.find(post => post._id === id)
    }
  }
})

export default store
