---
title: 最新Codex注册机+Warp教程！
published: 2026-04-06
description: '大约在今年的2月份，OpenAI 就开始了对免费 ChatGPT 账户开放最新部分模型。不幸的是，注册机使得账号注册越来越困难，但是依然有出路。'
image: /public/pic/codex-warp-menu.png
showcover: false
customcover: /public/pic/codex-warp-banner.png
tags: ["Codex", "Warp", "注册机", "AI"]
category: '教程'
outdated: true
aiSummary: "本文介绍了通过注册机注册 OpenAI 免费模型的风险、被封禁现状，以及利用 Cloudflare Warp 提高注册成功率的做法与具体使用方法，以及相关注意事项与测试IP示例。"
aiSummaryModel: "gpt-5-nano"
---
# 前言

大约在今年的2月份，OpenAI 就开始了对免费 ChatGPT 账户开放最新部分模型。包括 **GPT5.2**、**GPT5.3-Codex**、**GPT5.4**。但是，每个号的用量都是有限的。但但是，ChatGPT 账户注册本身是不强制要求**手机号**、**Captcha 验证码**的，所以就有人造出了 Codex 注册机。

不幸的是，从2月至今，一直在进行 **Codex开发者** vs **OpenAI**，导致 OpenAI 升级了防护流程，大量封禁用注册机注册的账户（纯 HTTP 注册流程最容易被 ban）。

目前部分邮箱域名被 Ban、部分邮箱域名要求在 OAuth 流程的时候添加手机号：
![codex-warp-add-phone.png](/public/pic/codex-warp-add-phone.png)

`qq.com` 的邮箱似乎不会被要求添加手机号（图片取自 2026-04-04）：
![codex-warp-oauth-successful.png|650](/public/pic/codex-warp-oauth-successfully.png)

# 使用注册机

:::tip[提示]
如果是免费小鸡，建议先用 Warp 套个 Cloudflare IP。听说能提高成功率，实测是能：[#使用 CF Warp](#使用-cf-warp)
:::

工具来自 [Linux DO](https://linux.do)，因为是 Lv2 帖子，出于保护所以没法放出来具体的。有账号且到了信任等级2的可以看看：[【冰の公益站】更新OAI5,更新纯白嫖方案 - LINUX DO](https://linux.do/t/topic/1849424)。我用的是 `2f15c59a3a91eb206d8f2a262485713a843e1b0b` 这版的（看不懂可以不管，懂得自然会懂）。

:::caution[警告]
原帖中提供的注册机安装脚本中包含了非开源、未经审查的**二进制文件（注册机）**，且需要提供 CLI Proxy API 的 Management Key。使用注册机前请注意风险。
**用别怕，怕别用**。
:::

安装完之后，会在 `localhost:25666` 开放一个 Web 控制台：

![](/public/pic/codex-warp-register-webui-top.png)

往下滑，可以看到当前注册状态：

![](/public/pic/codex-warp-1.png)

# 使用 CF Warp

这里指的是 [1.1.1.1 — The free app that makes your Internet faster.](https://one.one.one.one/)。

## 原因

据说是因为 Cloudflare Warp 的 IP 可以增加注册成功率。

## 安装

在一台海外网络环境的 Linux 机器上运行 Warp 脚本，脚本来自 [fscarmen / warp · GitLab](https://gitlab.com/fscarmen/warp)，以下表格内容来自其 [README.md 文档](https://gitlab.com/fscarmen/warp/-/blob/main/README.md)：

首次运行
```
wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh [option] [lisence/url/token]
```
再次运行
```
warp [option] [lisence]
```
  | [option] 变量1 变量2 | 具体动作说明 |
  | ----------------- | --------------- |
  | h | 帮助 |
  | 4 | 原无论任何状态 -> WARP IPv4 |
  | 4 lisence name | 把 WARP+ Lisence 和设备名添加进去，如 ```bash menu.sh 4 N5670ljg-sS9jD334-6o6g4M9F Goodluck``` |
  | 6 | 原无论任何状态 -> WARP IPv6 |
  | d | 原无论任何状态 -> WARP 双栈 |
  | o | WARP 开关，脚本主动判断当前状态，自动开或关 |
  | u | 卸载 WARP |
  | n | 断网时，用于刷WARP网络 (WARP bug) |
  | b | 升级内核、开启BBR及DD |
  | p | 刷 Warp+ 流量 |
  | c | 安装 WARP Linux Client，开启 Socks5 代理模式 |
  | l | 安装 WARP Linux Client，开启 WARP 模式 |
  | c lisence | 在上面基础上把 WARP+ Lisence 添加进去，如 ```bash menu.sh c N5670ljg-sS9jD334-6o6g4M9F``` |
  | r | WARP Linux Client 开关 |
  | v | 同步脚本至最新版本 |
  | i | 更换 WARP IP |
  | e | 安装 iptables + dnsmasq + ipset 分流流媒体方案 |
  | w | 安装 WireProxy 解决方案 |
  | y | WireProxy 开关 |
  | k | 切换 wireguard 内核 / wireguard-go-reserved |
  | g | 切换 warp 全局 / 非全局 或首次以 非全局 模式安装 |
  | s | s 4/6/d，切换优先级 warp IPv4 / IPv6 / 默认  |
  | 其他或空值| 菜单界面 |

---

根据需要选择：
- `d` ：接管机子 IPv4 & IPv6 网络，`curl ip-api.com` 下来都将是 Cloudflare Warp 网络。机子本身的 IP 会被隐藏。其实就是个 VPN。
- `4`：同理，接管 IPv4。
- `6`：同理，接管 IPv6。
其他模式自行查看 README。

## 测试 IP

```sh
curl ip-api.com
```
返回
```json
{
  "status"       : "success",
  "continent"    : "Asia",
  "continentCode": "AS",
  "country"      : "Japan",
  "countryCode"  : "JP",
  "region"       : "13",
  "regionName"   : "Tokyo",
  "city"         : "Tokyo",
  "district"     : "",
  "zip"          : "151-0053",
  "lat"          : 35.6893,
  "lon"          : 139.6899,
  "timezone"     : "Asia/Tokyo",
  "offset"       : 32400,
  "currency"     : "JPY",
  "isp"          : "Cloudflare, Inc.",
  "org"          : "Cloudflare WARP",
  "as"           : "AS13335 Cloudflare, Inc.",
  "asname"       : "CLOUDFLARENET",
  "mobile"       : false,
  "proxy"        : true,
  "hosting"      : false,
  "query"        : "104.28.243.105"
}
```
说明成功了。但是最好 IPv6 & IPv4 网站都测一遍。