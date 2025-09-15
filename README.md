# Taro React 小程序模板

这是一个基于 Taro 框架构建的 React 小程序模板项目，集成了 Redux 状态管理，适合快速开发多端应用（小程序、H5等）。

## 项目简介

- 项目名称: 请你自行填写
- 技术架构: Taro + React + TypeScript + Redux
- 支持平台: 微信小程序、H5、支付宝小程序、QQ小程序、百度小程序等

## 快速开始

### 环境准备

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
yarn
```

### 开发模式

```bash
yarn dev
```

### 构建生产版本

```bash
yarn build
```

## 项目结构

```txt
src/
├── api/              # API接口定义
├── app.config.ts     # 应用全局配置
├── app.scss          # 全局样式
├── app.tsx           # 应用入口文件
├── assets/           # 静态资源
├── components/       # 公共组件
│   ├── common/       # 通用组件
│   └── home/         # 业务组件
├── constants/        # 常量定义
├── hooks/            # 自定义Hooks
├── pages/            # 页面文件
│   ├── about/        # 关于页面
│   ├── index/        # 首页
│   └── subPages/     # 分包页面
├── store/            # Redux状态管理
│   ├── features/     # 功能模块
│   └── index.ts      # store配置
├── utils/            # 工具函数
└── types/            # TypeScript类型定义
```

## 核心功能模块

### 1. 状态管理 (Redux)

项目使用 Redux Toolkit 进行状态管理，并通过 Redux Persist 实现状态持久化。主要包含用户信息模块。

### 2. 网络请求

封装了统一的网络请求工具，支持请求拦截、响应处理、错误处理等功能。

### 3. 路由管理

使用 Taro 原生路由管理，并在 `constants/routes.ts` 中统一管理路由路径。

### 4. 页面分包

项目配置了页面分包加载，提高小程序启动性能。

## 代码规范

项目使用 ESLint 和 Prettier 进行代码质量控制和格式化，遵循业内通用的 React 和 TypeScript 最佳实践。

### 提交前检查

项目配置了 `husky` 和 `lint-staged`，在每次 commit 前会自动进行代码检查和格式化。

## 注意事项

1. 项目使用 `@/*` 路径别名代替 `src/*`，方便模块引入
2. 项目默认关闭了 Webpack 缓存，可在 config/index.ts 中开启以提升构建速度
3. CSS Modules 功能默认关闭，可在配置中启用

## License

本项目使用 MIT 协议.
