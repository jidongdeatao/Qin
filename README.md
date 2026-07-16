# 瑜伽学人 · Yoga Scholar

以 **AI 智慧 · 人文哲学 · 身心平衡** 为内核的瑜伽资料库：按主题归档文献与多媒体，支持在线阅读、笔记标注、文件上传下载与 AI 辅助阅读。

## 功能

- 十大知识领域与多层子目录导航
- 各目录文件上传 / 下载 / 删除
- 文本档案在线阅读与笔记标注
- 音视频素材播放与媒体笔记
- AI 辅助阅读（摘要、讲解、术语、思考题）
- 精选权威瑜伽 / 身心科学外链

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

上传的文件保存在 `data/uploads/`，元数据与笔记保存在 `data/files.json`、`data/notes.json`。

## 脚本

- `npm run dev` — 开发服务器
- `npm run build` — 生产构建
- `npm run start` — 启动生产服务
- `npm run lint` — ESLint 检查
