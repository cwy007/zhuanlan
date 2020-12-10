# 后端Icode终极使用方案

慕课网提供的 Icode 经过几次升级，现在把最终的解决方案整理如下，供同学们参考。

可以在 main.ts 中的拦截器里面一劳永逸的添加。

```js
// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
axios.interceptors.request.use(config => {
  ... 其他代码
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '******' }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '******')
  } else {
  // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '******' }
  }
  return config
})
```
