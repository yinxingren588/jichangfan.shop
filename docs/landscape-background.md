# 动态山水背景制作说明

更新日期：2026-10-21。制作方式：内置 image_gen 图像生成工具，生成一幅新原画；背景动态由网页动画实现。

## 画面与动态

原创水墨青绿山水，以暖白宣纸、青绿远山、松树和留白湖面搭配机场翻原有墨绿视觉。整站采用同一背景，正文区域增加浅色纸面以便阅读。

动态包括极缓的画面推移、两层云雾漂移、湖面水纹明暗变化与远处飞鸟。右下角“暂停山水 / 播放山水”可控制动画，选择保存在当前浏览器；系统减少动态偏好优先，切到其他标签页时也会暂停。无JavaScript时展示静态山水，文章保持可读。

## 文件

- design/shanshui-original.png：生成原画，1672 × 941，约2.4MB，只随源码提供。
- public/images/shanshui-background.webp：网页桌面图，175918字节。
- public/images/shanshui-background-mobile.webp：1000像素宽手机图，70478字节。
- src/components/LandscapeBackground.astro：装饰背景、动画、暂停按钮与偏好记忆。
- 外层“动态山水背景原画.png”：便于单独保存的同一原画。
- 外层“动态山水背景电脑预览.png”和“动态山水背景手机预览.png”：网站实际截图，截图本身是静态的；动态效果请查看本地网站。

图片已复制进项目，网站不会依赖生成工具目录或外部图片服务。网页版本只做格式与尺寸压缩，没有改动画面内容。原有文章、品牌数据和网址保留，部署由用户负责。

## 最终生成提示

```text
Use case: illustration-story. Asset type: original panoramic Chinese ink-and-wash landscape painting for a refined Chinese blog's animated background, landscape aspect ratio about 16:9, high detail. Create an elegant, genuinely painterly shan shui landscape on warm ivory xuan paper. Layered misty mountains in desaturated celadon, sage and deep forest-green ink, soft mineral pigment washes, fine dry-brush rock textures, graceful pine silhouettes close to the outer left and outer right edges, a serene pale jade lake across the lower half, delicate reflected mountain forms. Distant mountains dissolve into pale drifting-looking mist, generous warm off-white atmospheric space in the upper middle and central reading zone. The major mountains and trees are concentrated toward the lateral edges and lower third so website text in the central area remains readable. Sophisticated restrained composition with real ink diffusion and poetic quietness, luminous morning mist, nuanced traditional brushwork, beautiful nature, no people, no buildings, no calligraphy, no writing, no letters, no logos, no stamps, no watermark, no borders. This is the finished painting itself, not a website mockup. Single coherent landscape, not panels, not a diagram, not flat polygon vector art.
```

原始工具输出保留于 C:/Users/user/.codex/generated_images/01a15d3e-9ac6-7801-b210-40756f619b78/exec-50f94373-fcca-45a9-9e13-23b2eb4daccd.png；项目使用上面列出的本地副本。本轮未使用API或CLI回退方式。

