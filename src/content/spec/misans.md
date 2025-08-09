# 关于/MiSans
# [返回关于页](/about/)
本站使用了 [MiSans](https://hyperos.mi.com/font) 作为显示字体。字体来源为**小米官网**使用的 CDN 服务器。

:::tip
以下是本网站框架的配置文件 `tailwind.config.cjs`，位于网站根目录下。\
如需使用本站同款 `MiSans VF`（可变字重），可点击此处 <a href="/assets/misans.css" target="_blank" rel="noopener noreferrer">assets/misans.css</a> 获取对应的 `.css` 文件，然后将 `misans.css` 中所有内容插入到 `src/styles/main.css` 内，再将 `tailwind.config.cjs` 修改一下即可。
:::

```js title="tailwind.config.cjs" {9}
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "class", // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        sans: ["MiSans VF", "HarmonyOS Sans SC", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
```