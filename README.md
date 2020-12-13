# zhuanlan

## Project setup

```shell
npm install
npm run serve
npm run build
npm run lint
```

## api

[后端API swagger 文档](http://api.vikingship.xyz/public/swagger/index.html)

* 获取专栏列表

```js
// icode 有时效性
http://apis.imooc.com/api/columns?icode=A51C3975141CD028

```

<details>
  <summary>GET /api/columns</summary>
  <pre>
```json
{
  "code": 0,
  "data": {
    "count": 11,
    "list": [{
        "createdAt": "2020-08-20 22:21:10",
        "__v": 0,
        "avatar": {
          "_id": "5f3e41a8b7d9c60b68cdd1ec",
          "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"
        },
        "featured": true,
        "author": "5f3e86d62c56ee13bb830961",
        "description": "酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多",
        "title": "铺先生",
        "_id": "5f3e86d62c56ee13bb83096c",
        "key": 0
      },
      {
        "createdAt": "2020-08-20 22:21:10",
        "__v": 0,
        "avatar": {
          "_id": "5f3e3a17c305b1070f455202",
          "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg"
        },
        "featured": true,
        "author": "5f3e86d62c56ee13bb830960",
        "description": "半吊子系统和程序狗，沉迷高端理论，日渐消瘦。",
        "title": "Vehicle攻城狮",
        "_id": "5f3e86d62c56ee13bb83096b",
        "key": 1
      },
      {
        "createdAt": "2020-08-20 22:21:10",
        "avatar": {
          "_id": "5f3e41adb7d9c60b68cdd1ed",
          "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41adb7d9c60b68cdd1ed.jpg"
        },
        "featured": true,
        "author": "5f2918ed59d0b03366c0f0ad",
        "description": "Vue  is a progressive framework for building user interfaces. The core library is focused on the view layer only",
        "title": "这是一个专业测试专栏 vue3",
        "_id": "5f4db92abb821789a5490ed3",
        "key": 2
      },
      {
        "createdAt": "2020-08-20 22:21:10",
        "__v": 0,
        "avatar": {
          "_id": "5f3e41a8b7d9c60b68cdd1ec",
          "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"
        },
        "featured": true,
        "author": "5f3e86d62c56ee13bb83095f",
        "description": "公号：高斋CATTI，细致讲解让翻译学习更轻松！",
        "title": "CATTI和MTI考研考试资料与资讯",
        "_id": "5f3e86d62c56ee13bb83096a",
        "key": 3
      },
      {
        "createdAt": "2020-08-20 22:21:10",
        "__v": 0,
        "avatar": {
          "_id": "5f3e3a17c305b1070f455202",
          "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg"
        },
        "featured": true,
        "author": "5f3e86d62c56ee13bb830962",
        "description": "鞋神号：  sunmen123123",
        "title": "我不是鞋神",
        "_id": "5f3e86d62c56ee13bb830969",
        "key": 4
      }
    ],
    "pageSize": 5,
    "currentPage": 1
  },
  "msg": "请求成功"
}
```
  </pre>
</details>

/user/login

```js
// 测试账号
111@test.com
111111
```

## 参考

* [Typescript 中的 interface 和 type 到底有什么区别详解](https://www.jb51.net/article/163299.htm)
* [Error: Cannot find module 'vue-loader-v16/package.json'](https://stackoverflow.com/questions/63504594/error-cannot-find-module-vue-loader-v16-package-json)

* 解决方法：使用 4.0 以上版本

>Module '"../node_modules/vue-router/types"' has no exported member 'createWebHistory'. Did you mean to use 'import createWebHistory from "../node_modules/vue-router/types"' instead?ts(2614)
>
>npm i -S vue-router@next

* 解决方法：去掉 `type="text"`，然后，强制刷新浏览器，报错消失

>[Vue warn]: Failed setting prop "type" on `<textarea>`: value textarea is invalid. TypeError: Cannot set property type of `#<HTMLTextAreaElement>`which has only a getter

* [Vue style 深度作用选择器 >>> 与 /deep/（sass/less）](https://www.cnblogs.com/CyLee/p/10006065.html)
* [有作用域的 CSS](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8)
*[可索引的类型](https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types)
