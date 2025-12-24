# Convert 工具整体方案（含 SEO 设计）

## 一、核心原则（写入 PRD / 技术设计的总纲）

1. **一个工具 = 一个页面（一个 URL）**
2. **一个页面覆盖一个“问题域”，而不是一个转换问题**
3. 页面通过 **内部状态 / 默认示例 / 功能模块** 覆盖大量 `how to convert X to Y` 搜索
4. SEO 的目标不是写教程，而是：

   * 页面首屏即答案
   * 工具本身就是 SERP 的“最终落点”

---

## 二、工具 × SEO 汇总总表

下面是**最终确定要做的工具全集**，每一个工具都已经：

* 升维为完整能力
* 具备 SEO 承载结构
* 可以长期扩展

---

## 1. Unit Converter（通用单位换算工具）

**URL**
`/tools/unit-converter`

**核心问题域**
所有物理/工程单位的相互换算

**核心功能**

* 长度、重量、面积、体积、速度、压力、能量
* 公制 / 英制 / SI 单位体系
* 批量换算
* 热门转换快捷入口

**SEO 覆盖关键词**

* how to convert km to miles
* how to convert kg to lbs
* how to convert meters to feet

**SEO 设计要点**

* 默认示例 = 搜索量最高的转换对
* 页面内 Popular Conversions 模块
* 单位体系解释（SI vs Imperial）

---

## 2. Temperature Conversion & Reference Tool

**URL**
`/tools/temperature-converter`

**核心问题域**
温度体系换算与理解

**核心功能**

* Celsius / Fahrenheit / Kelvin / Rankine
* 常见温度对照（人体 / 天气 / 工业）
* 精度控制
* 科学计算模式

**SEO 覆盖关键词**

* convert celsius to fahrenheit
* fahrenheit to celsius
* kelvin to celsius

**SEO 设计要点**

* 默认示例：C → F
* 场景化参考而非长教程

---

## 3. Angle Conversion & Trigonometry Tool

**URL**
`/tools/angle-converter`

**核心问题域**
角度单位与三角函数辅助

**核心功能**

* Degrees / Radians / Gradians
* 常见角度参考
* 三角函数示例

**SEO 覆盖关键词**

* convert degrees to radians
* radians to degrees

---

## 4. Fraction / Decimal / Percentage Calculator

**URL**
`/tools/fraction-decimal-percentage`

**核心问题域**
数值形式互转与计算

**核心功能**

* Fraction ↔ Decimal
* Percentage ↔ Decimal
* 自动约分
* 计算步骤展示

**SEO 覆盖关键词**

* convert decimal to fraction
* fraction to decimal
* percent to decimal

---

## 5. Number Base & Binary Converter

**URL**
`/tools/number-base-converter`

**核心问题域**
进制体系转换

**核心功能**

* Binary / Octal / Decimal / Hex
* 位宽控制
* 补码解释

**SEO 覆盖关键词**

* binary to decimal
* decimal to hex

---

## 6. File Size Calculator & Storage Estimator

**URL**
`/tools/file-size-calculator`

**核心问题域**
文件大小理解、估算与传输

**核心功能**

* bit / byte / KB / MB / GB / TB / PB
* KiB / MiB / GiB（二进制）
* 下载 / 上传时间计算
* 存储容量估算
* 1TB 实际可用空间解释

**SEO 覆盖关键词**

* convert kb to mb
* convert mb to gb
* file size calculator
* how long to download 1gb

---

## 7. PDF Converter Suite

**URL**
`/tools/pdf-converter`

**核心问题域**
PDF 与其他格式互转

**核心功能**

* PDF ↔ JPG / PNG
* PDF ↔ Word / Text
* 批量处理
* 页面范围选择

**SEO 覆盖关键词**

* convert pdf to jpg
* pdf to word

---

## 8. Image Format Converter & Optimizer

**URL**
`/tools/image-converter`

**核心问题域**
图片格式转换与优化

**核心功能**

* JPG / PNG / WebP / HEIC / SVG
* 批量转换
* 压缩与尺寸控制

**SEO 覆盖关键词**

* convert heic to jpg
* png to jpg
* webp to jpg

---

## 9. Image to PDF Builder

**URL**
`/tools/image-to-pdf`

**核心问题域**
图片合成 PDF

**核心功能**

* 多图合并
* 页面顺序调整
* 页面尺寸 / 方向

**SEO 覆盖关键词**

* jpg to pdf
* image to pdf

---

## 10. Video & Audio Converter

**URL**
`/tools/video-audio-converter`

**核心问题域**
基础多媒体格式转换

**核心功能**

* mp4 ↔ mp3
* gif ↔ mp4
* 分辨率与质量控制

**SEO 覆盖关键词**

* convert mp4 to mp3
* gif to mp4

---

## 11. Time, Timestamp & Date Utility

**URL**
`/tools/time-timestamp-converter`

**核心问题域**
时间体系与时间戳

**核心功能**

* Unix timestamp ↔ Date
* 秒 / 毫秒 / 纳秒
* 时区支持

**SEO 覆盖关键词**

* convert unix timestamp to date
* timestamp to datetime

---

## 12. Encoding & Decoding Tool

**URL**
`/tools/encoding-decoding`

**核心问题域**
文本编码与解析

**核心功能**

* Base64
* URL Encode / Decode
* Unicode ↔ Text

**SEO 覆盖关键词**

* base64 decode
* url encode decode

---

## 13. Color Converter & Palette Tool

**URL**
`/tools/color-converter`

**核心问题域**
颜色体系转换

**核心功能**

* HEX / RGB / HSL
* 颜色对比
* 可复制输出

**SEO 覆盖关键词**

* hex to rgb
* rgb to hex

---

## 14. Text Case & String Converter

**URL**
`/tools/text-case-converter`

**核心问题域**
文本格式处理

**核心功能**

* Upper / Lower / Title
* Camel / Snake / Kebab

**SEO 覆盖关键词**

* uppercase to lowercase
* camel case to snake case

---

## 15. JSON / CSV & Data Converter

**URL**
`/tools/data-converter`

**核心问题域**
数据格式互转

**核心功能**

* JSON ↔ CSV / XML
* CSV ↔ SQL Insert
* 校验与格式化

**SEO 覆盖关键词**

* json to csv
* csv to json



