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
