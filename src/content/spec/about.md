# 关于 / Hi there!

本站使用 [@saicaca/fuwari](https://github.com/saicaca/fuwari) 博客模板，部分代码来源于 [@afoim/fuwari](https://github.com/afoim/fuwari)。嗯，真漂亮，真好用。

::github{repo="saicaca/fuwari"}
::github{repo="withastro/astro"}
::github{repo="Ad-closeNN/blog-fuwari"}
::github{repo="afoim/fuwari"}

# 站点分流
经过几个月的测试，**本站**之后将弃用 Netlify 托管，转而使用免费且更强大的 Cloudflare。之前使用过的分流测试版站点已移除。谢谢 Netlify，你好 Cloudflare！

# 关于我
一位住在 [中华人民共和国广西壮族自治区](https://baike.baidu.com/item/%E5%B9%BF%E8%A5%BF%E5%A3%AE%E6%97%8F%E8%87%AA%E6%B2%BB%E5%8C%BA/163178) 的学生。 [me.adclosenn.top](https://me.adclosenn.top)

## 联系方式
电子邮箱：[admin@adclosenn.top](mailto:admin@adclosenn.top)  
Discord：https://discord.com/users/1068060784300658688  
BlueSky：https://bsky.app/profile/adclosenn.top

# 关于本站
## 字体
使用的是 [MiSans VF](https://hyperos.mi.com/font) ，中英文可变字重字体从官方 CDN 服务器获取。 
[点此查看详情](/misans/)

## 一言
使用的是 [一言语句接口（JSON）](https://developer.hitokoto.cn/sentence/) 。`v1.hitokoto.cn`

## 统计信息
使用的是自托管（[Netlify](https://www.netlify.com) + [Neon](https://neon.com)）的 [Umami](https://umami.is) 。具体可查看 [手把手自托管 Umami](/posts/umami/) 。

---

# 2026/2/28
放弃了 [@imsyy/vitepress-theme-curve](https://github.com/imsyy/vitepress-theme-curve) 的 Curve VitePress 主题。此主题曾被试用于构建新博客。现已下线，继续使用 Fuwari 博客。

# 2025/9/19
1. 发现微软做的 [Cascadia Mono](https://github.com/microsoft/cascadia-code) 字体不错，就让他替换 [JetBrains Mono](https://www.jetbrains.com/zh-cn/lp/mono/) 成为第一默认 Code 字体。同时还把用不到的 Roboto 删掉。
```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789
!?&@#$%^*()-_+=[]{}<>/\|:;"',.`~
```

# 2025/9/7
1. 合并两个文件 `new-domain.md` + `new-free-dev-domain.md` -> [/posts/new-domain/](/posts/new-domain/)。
2. 删除了网易云音乐外链挂件，因为它加载很慢（最慢10s）。
3. 在[关于](/about/)页加入了站点类型检测脚本。

# 2025/8/31
1. 移除知更鸟主题。但未移除相关图片。
2. 加入一个新[备案](https://icp.redcha.cn/beian/ICP-2025080144.html)。

# 2025/8/16
因为 SVG 格式在没有 HarmonyOS Sans SC 字体的情况下无法正常显示这个字体（会显示为浏览器默认中文字体），所以本站使用 WebP 格式的 banner，大小 70.02 KB，相比 PNG 格式的 279.65 KB 减少了许多。

# 2025/8/14
用上了大佬插件 [@rehypejs/rehype-external-links](https://www.npmjs.com/package/rehype-external-links) ，这个插件可以让仅 Markdown 文件里面定义的链接以 `target="_blank` 的形式构建。也就是通过这个插件构建出来的超链接，点击后是通过新标签页打开的。而原来原版是直接在博客里，通过覆盖你正在阅读的文章来打开链接。  
可以试试点这两个链接进行比对： [更改后](https://www.bing.com) &nbsp;|&nbsp; <a href="https://www.bing.com">更改前</a>

# 2025/8/10
~~1145141919**810**~~  
::github{repo="carbon-app/carbon"}
https://carbon.now.sh

本站取消使用 Background 图像（之前为每日 Bing 图像），改为使用横幅由 [Carbon](https://github.com/carbon-app/carbon) 生成的 Banner：**Apache Getting Started**。  
出处：https://httpd.apache.org/docs/2.4/getting-started.html

```
Troubleshooting any problem without 
the error log is like driving with your eyes closed.
在没有错误日志的情况下诊断任何问题无异于闭眼开车
            —— Apache 官方文档 Getting Started 篇章
```

除此之外，我在 `/public/` 中留了 4 个 banner 文件：
- [/public/assets/apache_carbon.svg](/assets/apache_carbon.svg) ：由 [Carbon](https://github.com/carbon-app/carbon) 生成的 banner，`SVG` 格式。 ![apache_carbon](/assets/apache_carbon.svg)
- [/public/assets/apache_carbon.png](/assets/apache_carbon.png) ：由 [Carbon](https://github.com/carbon-app/carbon) 生成的 banner，`PNG` 格式。
- [/public/assets/apache_carbon.webp](/assets/apache_carbon.webp) ：由 [Carbon](https://github.com/carbon-app/carbon) 生成的 banner，`WebP` 格式。（本站使用中）
- [/public/assets/apache.jpg](/assets/apache.jpg)：网传的图片 ![apache](/assets/apache.jpg)

和一个 `JSON` 文件：
- <a href="/assets/carbon-config.json" target="_blank">/public/assets/carbon-config.json</a> ：[Carbon 官网](https://carbon.now.sh) 配置文件。