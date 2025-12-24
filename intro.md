# Online Converter Tool Site – Development Guide

## 1. 项目概述（Project Overview）

本项目是一个基于 **Next.js（App Router）+ shadcn/ui** 的英文在线转换工具站（Converter Site）。

### 核心目标

* 构建一个 **可扩展到 50–200+ converters** 的工具平台
* 以 **SEO 自然流量** 为主要增长方式
* 所有工具 **前端计算、无需登录、隐私优先**
* 首页与结构 **无需因工具数量增长而重构**

### 当前约束

* 仅英文版本（en），**不做国际化**
* 不做文件上传类转换（第一阶段）
* 优先 Text / Math / Number converters

---

## 2. 技术栈（Tech Stack）

### 核心技术

* Framework: Next.js (App Router, TypeScript)
* UI: shadcn/ui + Tailwind CSS
* Rendering: Static Generation (SSG), optional ISR
* Deployment: Vercel / Cloudflare Pages

### 技术原则

* 能前端解决的逻辑，**绝不引入后端**
* UI 组件统一、可复用
* 所有页面由数据驱动生成

---

## 3. 站点信息架构（Information Architecture）

### 顶层路由

* `/` Home
* `/tools` Tools Directory
* `/text-converters`
* `/math-converters`
* `/number-converters`
* `/tools/[slug]` Tool Page
* `/about`
* `/contact`
* `/privacy-policy`

### URL 规范（强制）

* 全小写
* 使用短横线 `-`
* URL 中包含 converter 语义

示例：

* `/tools/uppercase-to-lowercase-converter`
* `/tools/roman-numeral-converter`
* `/tools/decimal-to-fraction-converter`

---

## 4. 数据驱动设计（核心）

### 4.1 工具注册表（Tools Registry）

所有工具由统一数据源驱动，字段定义：

**基础字段**
* `slug`: string - URL 标识符
* `title`: string - 工具标题
* `category`: 'text' | 'math' | 'number' - 主分类
* `subcategory`: string (可选) - 二级分类，为未来扩展预留
* `description`: string - 简短描述（用于 meta）
* `keywords`: string[] - SEO 关键词数组

**功能字段**
* `component`: string - 组件文件路径引用
* `tags`: string[] - 标签（用于搜索和过滤）
* `inputType`: string - 输入类型说明
* `outputType`: string - 输出类型说明

**内容字段**
* `faq`: {question: string, answer: string}[] - FAQ 问答对
* `examples`: {input: string, output: string, description: string}[] - 示例数据
* `related`: string[] - 相关工具的 slug 数组

**元数据**
* `priority`: number - 优先级（用于首页推荐）
* `createdAt`: string - 创建时间
* `lastUpdatedAt`: string - 最后更新时间（SEO 新鲜度）

新增工具 = **新增一条数据 + 一个工具组件**

---

## 5. 首页设计（支持大量 converters）

### 首页定位

首页不是工具页，而是：

* 入口
* 导航
* 权重分发器

### 首页模块顺序

1. Header
2. Hero（站点定位）
3. Global Tool Search（最重要）
4. Primary Categories（一级分类）
5. Tabs：Popular / New / Recommended
6. Why Trust Us
7. Mini FAQ
8. Footer

### 首页原则

* 不展示全量工具
* 工具多时，**搜索 > 分类 > 推荐**

### 5.1 全局搜索实现细节

**搜索技术方案**
* 使用 Fuse.js 实现客户端模糊搜索
* 搜索索引在构建时生成，避免运行时性能损耗

**搜索字段权重**
1. `title` - 权重最高（10）
2. `description` - 中等权重（5）
3. `tags` - 中等权重（5）
4. `keywords` - 较低权重（3）

**搜索体验**
* 即时搜索（输入时实时显示结果）
* 高亮匹配关键词
* 显示搜索结果数量
* 支持键盘导航（↑↓ 选择，Enter 打开）
* 空状态提示（无结果时推荐热门工具）

**搜索排序策略**
1. 匹配度得分
2. priority 优先级
3. 按字母顺序

---

## 6. 分类页与目录页

### `/tools`（工具总目录）

* Search（全文工具搜索）
* Filter（Category / Tags）
* Grid 列表

### 分类页（Text / Math / Number）

* 分类介绍
* 工具卡片列表
* SEO 语义聚焦于该分类

---

## 7. 工具页统一模板（Tool Page Template）

每个工具页必须严格遵循以下结构：

1. **Breadcrumb 面包屑导航**（Home > Category > Tool）
2. **H1**（工具名）
3. **Meta info**（更新时间 | 分享按钮）
4. **Short description**
5. **Converter Panel**（输入 / 输出 / Copy / Clear）
6. **How it works**
7. **Examples**（使用结构化示例数据）
8. **FAQ**（Accordion）
9. **Related Tools**（内链）
10. **Footer**

### Converter Panel 规范

* 即输即算
* 输出可复制
* 不刷新、不跳转
* 移动端可用
* 错误提示友好

### 页面增强功能

**面包屑导航**
* 格式：Home > [Category Name] > [Tool Name]
* 使用 schema.org/BreadcrumbList 结构化数据
* 提升 SEO 和用户体验

**元信息区**
* 最后更新时间（格式：Last updated: Jan 15, 2025）
* 社交分享按钮（Twitter, Facebook, LinkedIn）
* 打印友好版本入口（可选）

**示例展示**
* 使用注册表中的 examples 数据自动渲染
* 可点击示例快速填入输入框
* 展示典型使用场景

---

## 8. Convert 功能规划（功能层）

### 一级分类（当前重点）

* Text Converters
* Math Converters
* Number & Code Converters

### 分类扩展策略

**未来可能的分类**
* Unit Converters（单位转换）
* Date & Time Converters（日期时间）
* Color Converters（颜色转换）
* Data Format Converters（数据格式）

**二级分类（subcategory）**
* 为未来细分预留字段
* 例如：Text > Case Conversion, Text > Format Cleanup
* 可选实现，不强制使用

**标签系统（tags）**
* 跨分类标签，如：popular, beginner-friendly, advanced
* 用于搜索和推荐算法
* 支持多维度过滤

### 已规划功能示例

#### Text

* Uppercase ↔ Lowercase
* Sentence Case / Title Case
* Remove Extra Spaces
* Text Sorter

#### Math

* Decimal ↔ Fraction
* Simplify Fraction
* Decimal ↔ Percentage

#### Number

* Roman ↔ Number
* Binary ↔ Decimal
* Hex ↔ Decimal

每个功能 = 独立页面

---

## 9. UI 组件规范（shadcn/ui）

### 必用组件

* Button
* Input / Textarea
* Card
* Tabs
* Select
* Badge
* Accordion
* Toast
* Separator

### 自定义业务组件

* ToolSearch
* ToolCard / ToolGrid
* CategoryTiles
* ConverterPanel
* FAQAccordion
* RelatedTools

---

## 10. SEO 规范（英文站）

### 每页必须

* Unique Title
* Meta Description
* Canonical
* H1 唯一
* 内链到相关工具

### 结构化数据

* Home: WebSite + SearchAction
* Tool Page: SoftwareApplication + FAQPage
* Category Page: CollectionPage

### 站点文件

* sitemap.xml
* robots.txt
* privacy-policy（必须）

---

## 11. 工程目录建议

```
src/
  app/
    page.tsx                          # 首页
    tools/
      page.tsx                        # 工具目录页
      [slug]/page.tsx                 # 动态工具页
    text-converters/page.tsx          # Text 分类页
    math-converters/page.tsx          # Math 分类页
    number-converters/page.tsx        # Number 分类页
    about/page.tsx
    contact/page.tsx
    privacy-policy/page.tsx

  components/
    layout/
      Header.tsx
      Footer.tsx
      Breadcrumb.tsx
    tools/
      ToolSearch.tsx                  # 全局搜索组件
      ToolCard.tsx                    # 工具卡片
      ToolGrid.tsx                    # 工具网格布局
      CategoryTiles.tsx               # 分类瓦片
      ConverterPanel.tsx              # 转换面板基础组件
      FAQAccordion.tsx                # FAQ 手风琴
      RelatedTools.tsx                # 相关工具
      ShareButtons.tsx                # 分享按钮
    ui/                               # shadcn/ui 组件

  lib/
    converters/                       # 纯转换逻辑函数
      text/
        case-converter.ts
        space-remover.ts
      math/
        fraction-converter.ts
        percentage-converter.ts
      number/
        roman-numeral.ts
        base-converter.ts
    utils/
      search.ts                       # Fuse.js 搜索配置
      seo.ts                          # SEO 工具函数
      validation.ts                   # 输入验证

  data/
    tools/
      text.ts                         # Text 工具注册数据
      math.ts                         # Math 工具注册数据
      number.ts                       # Number 工具注册数据
      index.ts                        # 合并所有工具数据
    schema.ts                         # 数据结构 Schema

  types/
    tool.ts                           # Tool 接口定义
    converter.ts                      # Converter 类型定义
```

---

## 12. 开发阶段路线图

### Phase 1（MVP）

**核心功能**
* 3 个工具（每个分类至少 1 个）
* 首页 + 工具页模板
* 基础 SEO（metadata, sitemap, robots.txt）

**基础设施**
* Google Analytics 4 集成
* 错误监控（Sentry 或 Vercel Analytics）
* 用户反馈入口（简单表单）
* 基础单元测试框架（转换逻辑测试）

**性能指标**
* Core Web Vitals 达标（LCP < 2.5s, FID < 100ms, CLS < 0.1）
* 首屏加载 < 1.5s

### Phase 2（扩量）

* 15–30 个工具
* 完整分类页
* 搜索 + 推荐逻辑

### Phase 3（平台化）

* 50–100+ 工具
* 单位转换 / 编码类
* 性能与体验优化

---

## 13. 性能优化策略

### 代码分割与懒加载

**工具组件按需加载**
```typescript
// 动态导入工具组件
const ToolComponent = dynamic(() => import(`@/lib/converters/${tool.component}`), {
  loading: () => <ConverterSkeleton />,
  ssr: true
})
```

**路由级别代码分割**
* 每个工具页独立 chunk
* 分类页独立 chunk
* 首页核心代码优先加载

### Bundle 优化

**体积监控**
* 单个工具组件 < 20KB (gzip)
* 首页 JavaScript < 100KB (gzip)
* 使用 `@next/bundle-analyzer` 监控

**依赖优化**
* 避免引入大型库（如 Moment.js，使用 date-fns）
* Tree-shaking 优化
* 共享组件抽取到 shared chunk

### 缓存策略

**客户端缓存**
* localStorage 缓存工具注册表数据
* 搜索索引缓存（避免重复构建）
* 用户最近使用的工具记录

**静态资源缓存**
* Next.js 自动静态优化
* CDN 缓存策略（immutable assets）
* 图片优化（使用 next/image）

### 渲染优化

**SSG 策略**
* 所有工具页构建时静态生成
* 首页和分类页静态生成
* 使用 ISR 按需更新（revalidate: 3600）

**运行时优化**
* React.memo 包裹重组件
* 转换函数使用 useMemo
* 避免不必要的重渲染

### 性能预算目标

**Core Web Vitals**
* LCP (Largest Contentful Paint) < 2.5s
* FID (First Input Delay) < 100ms
* CLS (Cumulative Layout Shift) < 0.1

**其他指标**
* TTI (Time to Interactive) < 3s
* First Load JS < 150KB
* 首屏渲染 < 1.5s

---

## 14. 错误处理规范

### 输入验证

**验证时机**
* 即时验证（onChange）
* 友好的错误提示
* 不阻断用户输入

**常见验证场景**
```typescript
// 示例：数字范围验证
if (value > MAX_VALUE) {
  return { error: 'Value exceeds maximum limit', max: MAX_VALUE }
}

// 示例：格式验证
if (!isValidFormat(value)) {
  return { error: 'Invalid format. Expected: XXX-XXX', example: '123-456' }
}
```

### 错误提示规范

**提示原则**
* 清晰说明问题所在
* 提供解决方案或示例
* 避免技术术语
* 使用友好语气

**提示位置**
* 输入框下方（inline error）
* 使用红色文字 + 图标
* 不使用 Toast（避免遮挡）

**错误信息示例**
* ❌ "Invalid input"
* ✅ "Please enter a number between 1 and 1000"

### 边界情况处理

**空值处理**
* 输入为空时清空输出
* 不显示错误（除非必填）

**极端值处理**
* 超大数字：提示范围限制
* 特殊字符：说明支持的字符集
* 溢出：降级处理或科学计数法

### 全局错误捕获

**客户端错误**
* 使用 Error Boundary 捕获 React 错误
* 发送到 Sentry 进行监控
* 展示友好的降级 UI

**转换逻辑错误**
* try-catch 包裹转换函数
* 返回明确的错误对象
* 记录错误日志供调试

---

## 15. 分析与监控策略

### 核心指标定义

**使用指标**
* 每个工具的页面浏览量（PV）
* 每个工具的转换次数（通过事件追踪）
* 搜索关键词分布
* 用户停留时长

**转化指标**
* 搜索 → 打开工具的转化率
* 首页 → 工具页的转化率
* 工具复制输出的比率
* Related Tools 点击率

**技术指标**
* Core Web Vitals
* 错误率（按工具统计）
* 加载时间分布
* 浏览器/设备分布

### Google Analytics 4 事件追踪

**关键事件**
```typescript
// 工具使用事件
gtag('event', 'tool_conversion', {
  tool_name: 'uppercase-lowercase',
  category: 'text',
  input_length: inputText.length
})

// 搜索事件
gtag('event', 'search', {
  search_term: query,
  results_count: results.length
})

// 复制输出事件
gtag('event', 'copy_output', {
  tool_name: toolSlug
})
```

**自定义维度**
* 工具分类
* 工具名称
* 搜索来源

### 性能监控

**使用 Vercel Analytics**
* Real User Monitoring (RUM)
* Core Web Vitals 追踪
* 按页面性能分析

**或使用 Sentry**
* 前端错误追踪
* 性能追踪（Transactions）
* 用户会话重放

### 数据驱动优化

**定期分析（每周）**
* 识别最受欢迎工具（优化推荐算法）
* 识别高跳出率工具（优化 UX）
* 分析搜索无结果关键词（发现新工具需求）

**A/B 测试场景**
* 首页布局变化
* 工具页 CTA 位置
* 搜索结果排序算法

---

## 16. 测试策略

### 单元测试

**转换逻辑测试（必须）**
```typescript
// 示例：测试大小写转换
describe('caseConverter', () => {
  it('converts to uppercase', () => {
    expect(toUpperCase('hello')).toBe('HELLO')
  })

  it('handles empty string', () => {
    expect(toUpperCase('')).toBe('')
  })

  it('handles special characters', () => {
    expect(toUpperCase('hello-world!')).toBe('HELLO-WORLD!')
  })
})
```

**覆盖率目标**
* 转换逻辑函数：100%
* 工具函数（utils）：> 80%
* 组件：> 60%

### 集成测试

**工具页模板测试**
* 输入 → 转换 → 输出流程
* 复制功能测试
* 清空功能测试
* 错误状态测试

**搜索功能测试**
* 搜索结果正确性
* 模糊匹配测试
* 空结果处理

### E2E 测试（关键流程）

**使用 Playwright**
```typescript
test('用户可以搜索并使用工具', async ({ page }) => {
  await page.goto('/')
  await page.fill('[data-testid="search-input"]', 'uppercase')
  await page.click('[data-testid="search-result-0"]')
  await page.fill('[data-testid="converter-input"]', 'hello')
  await expect(page.locator('[data-testid="converter-output"]')).toHaveText('HELLO')
})
```

**关键流程**
* 首页搜索 → 工具页使用
* 分类页 → 工具页
* Related Tools 内链导航

### 测试环境

**本地开发**
* Jest + React Testing Library（单元/集成测试）
* Playwright（E2E 测试）

**CI/CD**
* GitHub Actions 自动运行测试
* 部署前必须通过所有测试
* PR 自动运行测试并报告覆盖率

---

## 17. 无障碍性（Accessibility）

### WCAG 2.1 AA 标准

**必须遵守**
* 所有交互元素可键盘访问
* 足够的颜色对比度（至少 4.5:1）
* 所有图片有 alt 文本
* 表单有清晰的 label

### 键盘导航

**快捷键支持**
* Tab / Shift+Tab：焦点导航
* Enter：激活按钮/链接
* Esc：关闭模态框/清空搜索
* ↑↓：搜索结果导航

**焦点管理**
* 可见的焦点指示器
* 逻辑的 Tab 顺序
* 跳转到主内容链接（Skip to main content）

### 屏幕阅读器优化

**语义化 HTML**
* 使用正确的标题层级（H1 → H2 → H3）
* 使用 `<button>` 而不是 `<div onclick>`
* 使用 `<label>` 关联表单字段

**ARIA 属性**
```typescript
// 搜索组件
<input
  type="search"
  aria-label="Search tools"
  aria-describedby="search-help"
/>

// 转换结果
<div
  role="region"
  aria-live="polite"
  aria-label="Conversion result"
>
  {output}
</div>
```

**状态通知**
* 使用 `aria-live` 通知动态更新
* 错误信息使用 `role="alert"`
* 加载状态使用 `aria-busy`

### 移动端无障碍

* 触摸目标至少 44x44px
* 支持捏合缩放
* 横屏模式可用

### 测试工具

* axe DevTools（自动化检测）
* NVDA / JAWS（屏幕阅读器测试）
* Lighthouse Accessibility 审计

---

## 18. 核心设计原则总结

* **首页 = 入口系统，不是工具页**
* **一页一工具，一页一关键词**
* **数据驱动，而不是写死页面**
* **结构稳定，功能可无限扩展**
