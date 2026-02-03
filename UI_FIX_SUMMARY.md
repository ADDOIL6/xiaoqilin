# 城市选择器UI遮挡问题修复说明

## 问题描述
首页点击"选择城市"按钮后，下拉面板的下半部分被页面下方的三个彩色卡片（发布转租、转租房源、我要租房）遮挡，导致城市列表和字母索引显示不完整。

## 问题原因
页面元素的z-index层级关系不正确：
1. Hero section的overflow设置为hidden，限制了下拉面板的显示
2. Hero content的z-index设置过高（z-10）
3. Feature Cards Section没有明确的z-index，可能与下拉面板产生冲突

## 修复方案

### 1. 修改Hero Section的overflow属性
**文件**: `client/src/pages/Home.tsx` 第77行

```tsx
// 修改前
<div className="relative h-[600px] flex items-center justify-center overflow-hidden">

// 修改后
<div className="relative h-[600px] flex items-center justify-center" style={{ overflow: 'visible' }}>
```

### 2. 降低Hero Content的z-index
**文件**: `client/src/pages/Home.tsx` 第89行

```tsx
// 修改前
<div className="relative z-10 container text-center text-white">

// 修改后
<div className="relative container text-center text-white" style={{ zIndex: 1 }}>
```

### 3. 设置Feature Cards Section的z-index
**文件**: `client/src/pages/Home.tsx` 第144行

```tsx
// 修改前
<div className="container py-16">

// 修改后
<div className="container py-16" style={{ position: 'relative', zIndex: 0 }}>
```

## Z-Index层级关系

修复后的z-index层级（从高到低）：
- **CityFilter下拉面板**: 99999（最高层）
- **CityFilter遮罩层**: 99998
- **Hero Content**: 1
- **Feature Cards Section**: 0（默认层）

## 测试结果
✅ 城市选择器下拉面板完整显示
✅ 所有城市列表清晰可见
✅ 字母索引A-Z完整显示
✅ 不再被下方元素遮挡

## 修复时间
2026年02月02日 01:54

## 相关文件
- `client/src/pages/Home.tsx` - 首页组件
- `client/src/components/CityFilter.tsx` - 城市选择器组件（无需修改）
