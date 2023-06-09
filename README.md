# 项目

## 初始化项目

create-react-app react18_ts_music --template typescript

public 文件夹打包时直接被复制到 dist

## 配置项目

craco：create-react-app config 会自动合并（不推荐 eject）

npm install @craco/craco
npm install @craco/craco@alpha -D (适配 5.0.1 以上的 react-scripts)
a. 创建 craco.config.js
b. 配置 tsconfig.json

```
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
}
```

c. 修改 package.json 的 sctipts

## .editorconfig、prettier、eslint 配置

### .editorconfig

```
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

### prettier

```
npm install prettier -D
```

配置.prettierrc

```
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

配置 package.json 的 scripts ，对所有文件格式化 （可以查看 node_modules 的.bin/prettier）

```
"prettier": "prettier --write ."
```

创建.prettierignore

```
/build/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

vscode 的 Editor: Default Formatter 配置为 prettier

### eslint

```
npm install eslint -D
npx eslint --init
选择syntax and problems
选择modules
选择react
同时选Browser和Node
选js文件
```

vscode 配置可以加： "eslint.alwaysShowStatus": true

### 让 eslint 和 prettier 风格一致

```
npm install eslint-plugin-prettier eslint-config-prettier -D
```

.eslintrc.js 的 extends 中添加：

```
'plugin:prettier/recommended'
```

## 项目的 CSS 重置和 Less 支持

### normalize.css

npm install normalize.css
index.tsx 中 import "normalize.css"

### craco-less

可以看 antd 官网
为了适配，安装特定版本：
npm install craco-less@2.1.0-alpha.0

craco.config.js 文件中添加：

```
const CracoLessPlugin = require('craco-less')
module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
}

```

## 路由集成-路由的基本配置

### react-router-dom

-dom 是因为针对浏览器开发
npm install react-router-dom

```
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Discover />
  }
]

export default routes

// app.tsx
<div className="App">{useRoutes(routes)}</div>

// index.tsx
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)
```

### import React

import React 是为了 React.createElement

## React

### React.FC<IProps>

FunctionComponent

### children: ReactNode

import type { ReactNode } from 'react'

### memo

export default memo(ComponentName)

### Navigate, useNavigate

```
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  // useNavigate
  const navigate = useNavigate()
  navigate('/discover')
```

### 二级路由

Outlet 占位
二级路由也懒加载的话也要用 Suspense，防止使用最上层的，导致一整片闪动。

```
{
  path: '/discover',
  element: <Discover />,
  children: [
    {
      path: '/discover',
      element: <Navigate to="/discover/recommend" />
    },
    {
      path: '/discover/recommend',
      element: <Recommend />
    },
    {
      path: '/discover/Ranking',
      element: <Ranking />
    }
  ]
},

// Discover
<div>
  <Link to="/discover/recommend">推荐</Link>
  <Link to="/discover/ranking">排行</Link>
  <Suspense fallback="loading...">
    <Outlet />
  </Suspense>
</div>
```

### 分包处理：路由懒加载

```
// router/index.tsx

const Mine = lazy(() => import('@/views/mine'))

{
  path: '/mine',
  element: <Mine />
}

// App.tsx

<Link to="/mine">我的</Link>

<Suspense fallback="loading...">
  <div className="main">{useRoutes(routes)}</div>
</Suspense>

```

## 生成代码片段

### snippet generator

vscode-首选项-配置代码片段-typescriptreact

```
"react typescript": {
  "prefix": "tsreact",
  "body": [
    "import React, { memo } from 'react'",
    "import type { FC, ReactNode } from 'react'",
    "",
    "interface IProps {",
    "  children?: ReactNode",
    "}",
    "",
    "const ${1:Home}: FC<IProps> = () => {",
    "  return <div>${1:Home}</div>",
    "}",
    "",
    "export default memo(${1:Home})"
  ],
  "description": "react typescript"
}
```

## Redux

### @reduxjs/toolkit react-redux

npm install @reduxjs/toolkit react-redux

```
// counter.ts
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'Hello Redux'
  },
  reducers: {}
})

export default counterSlice.reducer

// store
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

type GetStateFnType = typeof store.getState // 先拿到函数类型
export type IRootState = ReturnType<GetStateFnType> // 再拿到返回值类型

export default store

// App
import { IRootState } from './store'

function App() {
  const { count, message } = useSelector(
    (state: IRootState) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqual // 浅层比较，不改变就不自动刷新
  )
  ...
}

// index
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
```

### 重构: 封装 useSelector 为 useAppSelector

```
// store
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

// App
import { useAppSelector } from './store'

const { count, message } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqual // 浅层比较，不改变就不自动刷新
  )
```

### 封装useDispatch

```
// counter.ts
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'Hello Redux'
  },
  reducers: {
    changeCountAction: (state, { payload }) => {
      state.count = payload
    }
  }
})

export const { changeCountAction } = counterSlice.actions
export default counterSlice.reducer

// store
type DispatchType = typeof store.dispatch
export const useAppDispatch: () => DispatchType = useDispatch

// App
const dispatch = useAppDispatch()
const handleClick = () => dispatch(changeCountAction(count + 1))
```



## 函数调用签名

```
interface IFnCall {
  (num: number): string
}

const foo: IFnCall = (num1) => num1.toString()
foo(123)
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

```

```

```

```
