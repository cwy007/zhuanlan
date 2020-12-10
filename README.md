# zhuanlan

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 参考

* [Typescript 中的 interface 和 type 到底有什么区别详解](https://www.jb51.net/article/163299.htm)
* [Error: Cannot find module 'vue-loader-v16/package.json'](https://stackoverflow.com/questions/63504594/error-cannot-find-module-vue-loader-v16-package-json)

* 解决方法：使用 4.0 以上版本

>Module '"../node_modules/vue-router/types"' has no exported member 'createWebHistory'. Did you mean to use 'import createWebHistory from "../node_modules/vue-router/types"' instead?ts(2614)
>
>npm i -S vue-router@next

* 解决方法：去掉 `type="textarea"`，然后，强制刷新浏览器，报错消失

>[Vue warn]: Failed setting prop "type" on `<textarea>`: value textarea is invalid. TypeError: Cannot set property type of `#<HTMLTextAreaElement>`which has only a getter
