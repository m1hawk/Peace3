# Peace3 - 加密货币社区平台

Peace3 是一个基于网络的社区平台，用户可以在这里分享他们在加密货币市场中的经历，重点关注损失和吸取的教训。

## 当前开发进度

### 后端 (Node.js with Express 和 MySQL)
- [x] 项目结构搭建完成
- [x] 数据库连接建立 (MySQL 与 Sequelize ORM)
- [x] 用户模型创建完成
- [x] 帖子模型创建完成
- [x] 基本服务器设置完成
- [x] Solana 钱包登录路由实现
- [x] JWT 中间件
- [x] 帖子的 CRUD 操作
- [x] 用户资料管理
- [x] Solana 钱包验证完善
- [ ] Twitter API 集成

### 前端 (React)
- [x] 项目结构搭建完成（使用 Create React App）
- [x] 基本路由实现
- [x] Navbar 组件创建完成
- [x] Home 组件创建完成（显示帖子列表）
- [x] Register 组件创建完成
- [x] Login 组件创建完成（Solana 钱包登录）
- [x] Profile 组件创建完成
- [x] CreatePost 组件创建完成
- [x] 用户认证状态管理
- [ ] UI/UX 改进

### 总体
- [x] 前后端 Solana 钱包登录集成
- [ ] 前后端 Twitter 登录集成
- [ ] 样式和 UI/UX 改进
- [ ] 测试
- [ ] 部署准备

## 项目结构

```
peace3/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Home.js
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   ├── Profile.js
    │   │   ├── CreatePost.js
    │   │   └── Navbar.js
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

## 下一步计划
1. 完善 Profile 组件功能
2. 完善 CreatePost 组件功能
3. 进一步改进用户认证状态管理
4. 改进整体 UI/UX
5. 实现 Twitter 登录（待定）

## 开始使用

1. 克隆仓库
2. 在 `server` 目录下运行 `npm install`
3. 在 `client` 目录下运行 `npm install`
4. 在 `server` 目录下创建 `.env` 文件并设置必要的环境变量
5. 在 `server` 目录下运行 `npm start` 启动后端服务器
6. 在 `client` 目录下运行 `npm start` 启动前端开发服务器

## 贡献指南

（这里将添加如何为项目做出贡献的指南）

## 许可证

（这里将添加许可证信息）
