# Element UI 自定义表单组件库

这是一个基于 Element UI 的自定义表单组件库，提供了一系列可配置的表单组件，支持表单设计、配置和预览功能。

## 功能特点

- 支持多种表单组件类型
- 组件配置可视化
- 实时预览
- 表单验证
- 配置自定义组件

## 支持的组件类型

### 基础输入组件
- 文本输入框 (Input Textarea)
- 数字输入框 (InputNumber)
- 开关 (Switch)

### 选择类组件
- 单选框 (Radio)
- 复选框 (Checkbox)
- 下拉选择框 (Select)

### 日期时间组件
- 日期选择器 (DatePicker)
- 时间选择器 (TimePicker)
- 日期时间选择器 (DateTimePicker)

### 自定义组件
- 可自行配置的自定义组件

## 组件配置项

### 通用配置
- 组件名称
- 是否必填
- 是否禁用
- 占位文本
- 默认值

### 特定组件配置

#### 文本输入框
- 最大/最小长度
- 是否显示字数统计
- 是否可清空
- 前缀/后缀图标

#### 数字输入框
- 最小值/最大值
- 步长
- 精度
- 是否严格步数
- 是否显示控制按钮

#### 单选框/复选框
- 选项列表
- 默认选中项
- 选项布局

#### 下拉选择框
- 选项列表
- 是否多选
- 是否可清空
- 是否可搜索

#### 日期时间组件
- 日期/时间格式
- 选择范围
- 是否显示时间
- 是否可清空

## 使用说明

### 安装依赖
```bash
npm install
```

### 运行项目
```bash
npm run serve
```

### 构建项目
```bash
npm run build
```

## 项目结构

```
src/
├── components/
│   ├── FormItem/          # 表单组件
│   │   ├── CuInput.vue
│   │   ├── CuInputNumber.vue
│   │   ├── CuRadio.vue
│   │   ├── CuCheckbox.vue
│   │   ├── CuSelect.vue
│   │   ├── CuSwitch.vue
│   │   ├── CuTimePicker.vue
│   │   ├── CuDatePicker.vue
│   │   └── CuDateTimePicker.vue
│   └── FormSettings/      # 组件配置面板
│       ├── FormInput.vue
│       ├── FormInputNumber.vue
│       ├── FormRadio.vue
│       ├── FormCheckbox.vue
│       ├── FormSelect.vue
│       ├── FormSwitch.vue
│       ├── FormTimePicker.vue
│       ├── FormDatePicker.vue
│       └── FormDateTimePicker.vue
├── constants/            # 常量定义
└── utils/               # 工具函数
```

## 使用指南

### 配置表单
1. 在表单配置页面中配置表单项
2. 在表单展示中可以看到配置的表单项

### 配置自定义组件
1. 在配置表单项的“项目类型”中选择“CustomItem 自定义组件”，自定义组件名称需要与组件的 name 属性提供的组件名称一致
2. 在 `FormCustom` 目录下创建自定义组件文件

### 添加新组件
1. 在 `FormItem` 目录下创建组件文件
2. 在 `FormSettings` 目录下创建对应的配置面板
3. 在组件中实现必要的属性和方法
4. 在配置面板中实现组件的配置项

## 注意事项

1. 所有组件都基于 Element UI 开发，请确保已安装 Element UI
2. 组件配置面板中的验证规则需要根据实际需求进行配置
3. 日期时间组件的格式需要符合 Element UI 的要求
4. 数字输入框的精度和步长需要合理配置

