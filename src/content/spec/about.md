# 关于 / Hi there!

:::note[信息]
当前域名：<code><span id="cdns-hostname"></span></code>。解析为 <span id="cdns-type"></span>。
:::

既然你来到了这里，就说明你在访问<span id="cdns"></span>

本站使用 [@saicaca/fuwari](https://github.com/saicaca/fuwari) 博客模板，部分代码来源于 [@afoim/fuwari](https://github.com/afoim/fuwari)。嗯，真漂亮，真好用。

::github{repo="saicaca/fuwari"}
::github{repo="withastro/astro"}
::github{repo="Ad-closeNN/blog-fuwari"}
::github{repo="afoim/fuwari"}

# 域名
1. adclosenn.top
2. adclosenn.dev
3. 19991230.xyz
4. adsb.dpdns.org
5. adclosenn.dpdns.org
6. ...

# 站点分流
**主站**使用 Netlify 托管。但是它的节点稳定性等在**在中国大陆**不是很行。所以还有在其他平台部署的**试运行**站点，且非 Netlify 站点的**部分功能会缺失，不建议使用**：
1. Cloudflare Worker（**无**优选）：https://worker-cf.adclosenn.dev
2. Cloudflare Worker（[CMLiussss](https://cf.090227.xyz) 优选）：https://youxuan-cf-worker.adclosenn.dev
3. Cloudflare Pages（**无**优选）：https://cf.adclosenn.dev
4. Cloudflare Pages（[Visa 新加坡](https://www.visa.com.sg) 优选）：https://www.adclosenn.dev
5. Vercel（**无**优选）：https://origin.vercel.adclosenn.dev
6. Vercel（`64.29.17.65` 优选）：https://vercel.adclosenn.dev
6. 腾讯 EdgeOne CDN（加速 Cloudflare Pages，**无**优选）：https://cf-eo.adclosenn.dev
8. 腾讯 EdgeOne Pages（**无**优选）：https://eo.adclosenn.top

:::note[笔记]
Cloudflare Pages 优选版站点，在中国大陆境内为**优选域名 www.visa.com.sg**，在境外为源 `blog-fuwari-c8w.pages.dev`。
:::

对于非 Netlify 站点，建议优先选择**无优选**的 [https://cf.adclosenn.dev](https://cf.adclosenn.dev)。如果后续测试中 Netlify 节点的质量成绩始终不如 Cloudflare，则会迁移到 Cloudflare。

**还有，在中国大陆境外你随便选一个访问，其速度和稳定性都几乎一样。**

---

# 关于我
一位住在[中华人民共和国广西壮族自治区](https://baike.baidu.com/item/%E5%B9%BF%E8%A5%BF%E5%A3%AE%E6%97%8F%E8%87%AA%E6%B2%BB%E5%8C%BA/163178)的学生。

## 联系方式
电子邮箱：[1709301095@qq.com](mailto:1709301095@qq.com) 或 [admin@adclosenn.top](mailto:admin@adclosenn.top)  
Discord：https://discord.com/users/1068060784300658688

---

# 关于本站
## 字体
使用的是 [MiSans VF](https://hyperos.mi.com/font) ，中英文可变字重字体从官方 CDN 服务器获取。 
[点此查看详情](/misans/)

## 一言
使用的是 [一言语句接口（JSON）](https://developer.hitokoto.cn/sentence/) 。`v1.hitokoto.cn`

## 统计信息
使用的是自托管（ [Netlify](https://www.netlify.com) + [Neon](https://neon.com)）的 [Umami](https://umami.is) 。具体可查看 [手把手自托管 Umami
](/posts/umami/) 。

---

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

<script>
    // 主机名解析
    const hostname = window.location.hostname;
    const siteType = document.getElementById('cdns');
    const hName = document.getElementById('cdns-hostname');
    const cdnType = document.getElementById('cdns-type');
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.includes("192.168.")){
        // Local
        siteType.innerHTML = "本地服务器。";
        cdnType.textContent = "本地"
    }
    else if (hostname === "adclosenn.top"){
        // Netlify
        siteType.innerHTML = '由 <a href="https://www.netlify.com" target="_blank">Netlify</a> 托管的 <a href="https://adclosenn.top">https://adclosenn.top</a>。本站 Netlify Amazon CDN 优选 IP：<code>3.33.186.135</code>';
        cdnType.textContent = "Netlify";
        
    }
    else if (hostname === "worker-cf.adclosenn.dev") {
        // Cloudflare Workers https://worker-cf.adclosenn.dev
        siteType.innerHTML = '由 <a href="https://workers.cloudflare.com" target="_blank">Cloudflare Workers</a> 托管的 <a href="https://worker-cf.adclosenn.dev">https://worker-cf.adclosenn.dev</a>。本站点未进行 IP 优选。';
        cdnType.textContent = "Cloudflare Workers";
    }
    else if (hostname === "youxuan-cf-worker.adclosenn.dev") {
        // Cloudflare Workers 优选 https://youxuan-cf-worker.adclosenn.dev
        siteType.innerHTML = '由 <a href="https://workers.cloudflare.com" target="_blank">Cloudflare Workers</a> 托管的 <a href="https://youxuan-cf-worker.adclosenn.dev">https://youxuan-cf-worker.adclosenn.dev</a>。本站点已进行 IP 优选，使用的 CNAME 为 <code>youxuan.cf.090227.xyz</code>。';
        cdnType.textContent = "Cloudflare Workers";
    }
    else if (hostname === "cf.adclosenn.dev") {
        // Cloudflare Pages https://cf.adclosenn.dev
        siteType.innerHTML = '由 <a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a> 托管的 <a href="https://cf.adclosenn.dev">https://cf.adclosenn.dev</a>。本站点未进行 IP 优选。';
        cdnType.textContent = "Cloudflare Pages";
    }
    else if (hostname === "www.adclosenn.dev") {
        // Cloudflare Pages 优选 https://www.adclosenn.dev
        siteType.innerHTML = '由 <a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a> 托管的 <a href="https://www.adclosenn.dev">https://www.adclosenn.dev</a>。本站点已进行 IP 优选，使用的 CNAME 为 <code>www.visa.com.sg</code>。';
        cdnType.textContent = "Cloudflare Pages";
    }
    else if (hostname === "origin.vercel.adclosenn.dev") {
        // Vercel https://origin.vercel.adclosenn.dev
        siteType.innerHTML = '由 <a href="https://vercel.com" target="_blank">Vercel</a> 托管的 <a href="https://origin.vercel.adclosenn.dev">https://origin.vercel.adclosenn.dev</a>。本站点未进行 IP 优选，使用的官方 CNAME 为 <code>cname.vercel-dns.com</code>。';
        cdnType.textContent = "Vercel";
    }
    else if (hostname === "vercel.adclosenn.dev") {
        // Vercel 优选 https://vercel.adclosenn.dev
        siteType.innerHTML = '由 <a href="https://vercel.com" target="_blank">Vercel</a> 托管的 <a href="https://vercel.adclosenn.dev">https://vercel.adclosenn.dev</a>。本站点已进行 IP 优选，使用的 IP 为 <code>64.29.17.65</code>。';
        cdnType.textContent = "Vercel";
    }
    else if (hostname === "cf-eo.adclosenn.dev") {
        // EdgeOne CDN https://cf-eo.adclosenn.dev
        siteType.innerHTML = '由 <a href="https://edgeone.ai/zh" target="_blank">EdgeOne CDN</a> 加速的 <a href="https://cf-eo.adclosenn.dev">https://cf-eo.adclosenn.dev</a>。本站点未进行 IP 优选，源站为 Cloudflare Pages。';
        cdnType.textContent = "腾讯云 EdgeOne";
    }
    else if (hostname === "eo.adclosenn.top") {
        // EdgeOne Pages https://eo.adclosenn.top
        siteType.innerHTML = '由 <a href="https://edgeone.ai/zh/products/pages" target="_blank">EdgeOne Pages</a> 托管的 <a href="https://eo.adclosenn.top">https://eo.adclosenn.top</a>。本站点未进行 IP 优选。';
        cdnType.textContent = "腾讯云 EdgeOne";
    }
    else{
        siteType.innerHTML = "未知主机名：<code>" + hostname + "</code>。";
        cdnType.innerHTML = "未知主机名"
    }
    if (hostname != "") {
        hName.textContent = hostname;
    }
    else {
        hName.textContent = "本地 HTML 文件";
    }
</script>