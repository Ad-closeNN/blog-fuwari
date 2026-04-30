---
title: hCaptcha “强兼” reCaptcha？
published: 2025-08-13
tags: ["网站", "验证"]
description: 一次出3个 hCaptcha？瞧瞧你干的好事！
image: /public/pic/hCaptcha-localhost-errkey.png
category: 记录
aiSummary: "本文介绍了在同时使用 Google reCaptcha 与 hCaptcha 时，hCaptcha 会尝试兼容导致界面混乱的情况，并给出通过将脚本 URL 加上 recaptchacompat=off 关闭兼容化的简单解决方法。"
aiSummaryModel: "gpt-5-nano"
---
# 强兼 Google reCaptcha 失败？
如你所见，这是 hCaptcha 无法验证的样子。当然，如果你在一个页面同时放上 [Google reCaptcha](https://developers.google.com/recaptcha?hl=zh-cn)（我的是 v2）和 [hCaptcha](https://www.hcaptcha.com)，那么聪明的 hCaptcha 会 [开始兼容它](https://docs.hcaptcha.com/configuration) 。
![hcaptcha-recaptchacompat-origin](/public/pic/hcaptcha-recaptchacompat-origin.png)

**译文：**  
![hcaptcha-recaptchacompat-translated](/public/pic/hcaptcha-recaptchacompat-translated.png)

---

[posts/captcha/](/posts/captcha/)  
而开启后却是这样的：
![hcaptcha-three-boxes](/public/pic/hcaptcha-three-boxes.png)

没错，出现了 3 个 hCaptcha 框。而且出现的位置就在 reCaptcha 的位置。哇，强兼失败？

byd 太气人了这。

---

# 解决方法
将 hCaptcha 的脚本请求 URL 加上 `?recaptchacompat=off` 即可：
```html
<script 
    src="https://hcaptcha.com/1/api.js?recaptchacompat=off" async defer>
</script>
```