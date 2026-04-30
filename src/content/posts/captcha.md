---
title: "你是人类吗？"
published: 2025-08-12
tags: ["验证"]
description: 我的 Captcha 还蛮多的，欢迎你们来这里玩，玩累了就直接刷新，没问题的~
image: /public/pic/cloudflare-turnstile-verify-error-1.png
category: 杂项
draft: false
showcover: false
customcover: /public/pic/cloudflare-turnstile-verify-error.png
aiSummary: "本文介绍了多种验证码实现与集成要点，涵盖 Google reCaptcha、Cloudflare Turnstile、hCaptcha 及 Arkose Labs 的使用场景、 key 配置与前端嵌入方式，帮助开发者快速了解并对比不同方案的适用性与实现流程。"
aiSummaryModel: "gpt-5-nano"
---
<head>
    <!-- Google reCaptcha v2-->
    <!-- <script src="https://www.google.com/recaptcha/api.js" async defer></script> -->
    <script src="https://recaptcha.net/recaptcha/api.js" async defer></script>
    <!-- Cloudflare Turnstile -->
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" defer async></script>
    <!-- hCaptcha -->
    <script src="https://hcaptcha.com/1/api.js?recaptchacompat=off&hl=zh" async defer></script>
</head>

你好~
我的 Captcha 还蛮多的，欢迎你们来这里玩，玩累了就直接刷新，没问题的~

# Google reCaptcha V2
## 休闲版（不保证）
<div class="g-recaptcha" data-sitekey="6LerBqQrAAAAAJm_8-H-wq25iSKxprYEW8G_XYhi"></div>

## 挑战版（不保证）
<div class="g-recaptcha" data-sitekey="6LcQFKQrAAAAAFg294vepQULbQX11BXa0NTt-21h"></div>

---

# Cloudflare Turnstile
<div id="example-container"></div>
<script is:inline>
  function onloadTurnstileCallback() {
    // 确保 turnstile 对象已加载
    if (typeof turnstile !== 'undefined') {
      turnstile.render('#example-container', {
        // 重要：将下面的 sitekey 替换为你自己的
        sitekey: '0x4AAAAAABq8mQb4rm0Y4ir5', // 这是一个用于测试的 key
        callback: function(token) {
          console.log(`挑战成功，获取到的 token 是: ${token}`);
          // 在这里你可以将 token 发送到后端进行验证
        },
      });
    }
  }
</script> 

---

# hCaptcha
## 简单模式
<div class="h-captcha" style="margin: 0; display: inline-block;" data-sitekey="96520da8-ea64-4416-bbcc-f1bc1602bcc4"></div>

## 困难模式
<div class="h-captcha" style="margin: 0; display: inline-block;" data-sitekey="2bca1990-f990-4430-987a-5b7a1522e26e"></div>

---

# Arkose Labs FunCAPTCHA
<iframe src="https://iframe.arkoselabs.com/3EE79F8D-13A6-474B-9278-448EA19F79B3/index.html" width="700" height="500" frameborder="0" allowfullscreen></iframe>