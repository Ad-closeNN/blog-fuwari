# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 项目概述

基于 [Fuwari](https://github.com/saicaca/fuwari) 的静态博客，使用 Astro 6.1 + TailwindCSS 3.4 + Svelte 5。

- **包管理器**: pnpm 9（`preinstall` hook 强制只允许 pnpm）
- **语言**: TypeScript (strict)
- **代码规范**: Biome（同时负责 format 和 lint），无 ESLint/Prettier
- **部署**: Cloudflare Pages（见 `wrangler.toml`）

## 常用命令

| 命令 | 用途 |
|---|---|
| `pnpm dev` | 启动本地开发服务器 (`localhost:4321`) |
| `pnpm build` | 构建生产版本到 `./dist/` 并运行 Pagefind 索引 |
| `pnpm preview` | 本地预览构建产物 |
| `pnpm check` | 运行 Astro 类型检查 |
| `pnpm type-check` | 运行 TypeScript 类型检查 (`tsc --noEmit`) |
| `pnpm format` | Biome 格式化 `./src` |
| `pnpm lint` | Biome 检查和修复 `./src` |
| `pnpm new-post <filename>` | 在 `src/content/posts/` 创建新文章 Markdown |
| `pnpm astro` | 直接调用 Astro CLI |

## 项目结构

```
src/
├── config.ts              # 站点主配置（标题、导航、个人资料、许可证等）
├── content.config.ts      # Astro Content Collections 定义（posts + spec）
├── content/
│   ├── posts/             # 博客文章（.md / .mdx），通过文件系统集合加载
│   └── spec/              # 特殊页面集合
├── components/
│   ├── widget/            # 侧边栏组件（Profile, TOC, Tags, Categories 等）
│   ├── control/           # 交互控件（BackToTop, Pagination, ButtonLink 等）
│   ├── misc/              # 杂项（ImageWrapper, License, Markdown）
│   └── *.astro/*.svelte   # 页面级组件（Navbar, Footer, Search, PostPage 等）
├── pages/
│   ├── [...page].astro    # 首页分页路由
│   ├── posts/[...slug].astro  # 文章详情页
│   ├── archive.astro      # 归档页
│   ├── about.astro        # 关于页
│   ├── friends.astro      # 友链页
│   ├── rss.xml.ts         # RSS 生成
│   └── robots.txt.ts      # robots.txt
├── layouts/
│   ├── Layout.astro       # 根布局（SEO、主题、Umami 分析、PhotoSwipe）
│   └── MainGridLayout.astro # 主网格布局（导航栏、Banner、侧边栏、TOC）
├── plugins/               # Remark/Rehype 插件 + Expressive Code 插件
├── i18n/                  # 多语言翻译（en, zh_CN, ja, ko 等）
├── utils/                 # 工具函数（content-utils, date-utils, url-utils, setting-utils）
├── types/                 # TypeScript 类型定义
├── constants/             # 常量（分页大小、主题模式、Banner 高度等）
└── styles/                # CSS 文件（main.css, markdown.css, scrollbar.css 等）
```

## 关键架构信息

### 内容管理
- 文章以 Markdown/MDX 格式存储在 `src/content/posts/`
- 使用 Astro Content Collections 加载，schema 在 `content.config.ts` 中定义
- 文章 frontmatter 包含: `title`, `published`, `description`, `image`, `tags`, `category`, `draft`, `lang`, `showcover`, `customcover` 等

### 路由
- `[...page].astro` — 首页分页
- `posts/[...slug].astro` — 文章详情页，生成 JSON-LD 结构化数据
- `archive.astro` — 归档，tags，categories
- 自定义页面: `about.astro`, `friends.astro`

### 路径别名（tsconfig 配置）
- `@/*` → `src/*`，`@components/*` → `src/components/*`，`@assets/*` → `src/assets/*`
- `@utils/*` → `src/utils/*`，`@i18n/*` → `src/i18n/*`
- `@layouts/*` → `src/layouts/*`，`@constants/*` → `src/constants/*`

### 页面过渡
- 使用 Swup 实现 SPA 风格页面过渡
- 支持自定义滚动条 (`OverlayScrollbars`)，图片点击放大 (`PhotoSwipe`)

### Markdown 扩展
- GitHub Admonitions (note, tip, important, caution, warning)
- GitHub 仓库卡片，数学公式 (KaTeX)
- 扩展代码块 (Expressive Code) 支持折叠、行号、复制按钮、语言徽章
- 自动标题锚点链接

### 外部服务
- **分析**: Umami（自建）+ Google Analytics
- **评论**: Giscus（基于 GitHub Discussions）
- **搜索**: Pagefind（构建时生成搜索索引）
- **统计**: 通过 Umami API 获取文章浏览量

## 注意事项

- `src/config.ts` 是站点配置中心
- 构建会先运行 `astro build`，然后执行 `pagefind --site dist` 生成搜索索引
- Biome 不处理 CSS 文件（在 `biome.json` 中排除）
- Svelte 组件使用 Svelte 5 语法
- 主题色基于 CSS 变量 `--hue` 动态计算
