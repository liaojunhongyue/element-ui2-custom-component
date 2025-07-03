# Element UI 组件库二次封装

这是一个基于 Element UI 组件库进行二次封装的项目。提供的功能有：

1. 可视化的自定义表单配置及展现。
2. 表格(Table)组件增加拖拽功能（包含普通表格拖拽、可展开表格拖拽、树形表格拖拽）。
3. Element UI 对话框(Dialog)组件增加拖拽功能。

## 项目使用说明

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

## Element UI 自定义表单组件库

这是一个基于 Element UI 的自定义表单组件库，提供了一系列可配置的表单组件，支持表单设计、配置和预览功能。

### 功能特点
- 支持多种表单组件类型
- 组件配置可视化
- 实时预览
- 表单验证
- 配置自定义组件

### 支持的组件类型
#### 基础输入组件
- 文本输入框 (`Input Textarea`)
- 数字输入框 (`InputNumber`)
- 开关 (`Switch`)
#### 选择类组件
- 单选框 (`Radio`)
- 复选框 (`Checkbox`)
- 下拉选择框 (`Select`)
#### 日期时间组件
- 日期选择器 (`DatePicker`)
- 时间选择器 (`TimePicker`)
- 日期时间选择器 (`DateTimePicker`)
#### 自定义组件
- 可自行配置的自定义组件

### 组件配置项
#### 通用配置
- 组件名称
- 是否必填
- 是否禁用
- 占位文本
- 默认值
#### 特定组件配置
##### 文本输入框
- 最大/最小长度
- 是否显示字数统计
- 是否可清空
- 前缀/后缀图标
##### 数字输入框
- 最小值/最大值
- 步长
- 精度
- 是否严格步数
- 是否显示控制按钮
##### 单选框/复选框
- 选项列表
- 默认选中项
- 选项布局
##### 下拉选择框
- 选项列表
- 是否多选
- 是否可清空
- 是否可搜索
##### 日期时间组件
- 日期/时间格式
- 选择范围
- 是否显示时间
- 是否可清空

### 使用指南
#### 配置表单
1. 在表单配置页面中配置表单项。
2. 在表单展示中可以看到配置的表单项。
#### 配置自定义组件
1. 在配置表单项的“项目类型”中选择“`CustomItem`自定义组件”，自定义组件名称需要与组件的`name`属性提供的组件名称一致。
2. 在`FormCustom`目录下创建自定义组件文件。
#### 添加新组件
1. 在`FormItem`目录下创建组件文件。
2. 在`FormSettings`目录下创建对应的配置面板。
3. 在组件中实现必要的属性和方法。
4. 在配置面板中实现组件的配置项。

## Element UI 表格(Table)组件增加拖拽功能

本项目支持多种基于 Element UI 的表格拖拽功能，具体包括：普通表格拖拽、可展开表格拖拽、树形表格拖拽。相关示例代码位于 `src/pages/table/` 目录下。

### 1. 普通表格拖拽（basicTableDrag.vue）
- 支持对表格的整行进行拖拽排序。
- 拖拽方式为：鼠标移动到表格的行上，按住即可进行拖拽。
- 拖拽完成后，数据顺序会自动更新。
- 适用于无嵌套、无展开行的简单表格。

### 2. 可展开表格拖拽（deployableTableDrag.vue）
- 支持 Element UI 的可展开表格（带有展开行的表格）进行拖拽排序。
- 拖拽时，所有展开的行会自动收起，拖拽完成后会恢复原先的展开状态。
- 仅支持对未展开的主行进行拖拽，展开行不可拖拽。
- 拖拽完成后，表格数据顺序自动更新。
- 适用于需要展示详情信息的可展开表格场景。

### 3. 树形表格拖拽（treeTableDrag.vue）
- 支持树形结构（多级嵌套）的表格行拖拽。
- 仅支持同一父级节点下的同级节点之间拖拽，不能跨层级拖拽。
- 拖拽后，行的展开/折叠状态不会改变。
- 拖拽时会自动处理子节点的跟随移动，保证树结构的正确性。
- 适用于有层级结构的数据展示和排序需求。

> 以上拖拽功能均基于 [sortablejs](https://github.com/SortableJS/Sortable) 实现。
> 
> 如需体验和查看具体实现，请参考 `src/pages/table/` 目录下对应的 `.vue` 文件。

## Element UI 对话框(Dialog)组件增加拖拽功能

本项目为 Element UI 的 Dialog 组件提供了可拖拽功能，允许用户通过拖拽对话框头部来移动对话框位置，提升用户体验。

### 功能特点

- **拖拽图标**：在对话框头部自动添加拖拽图标，提供直观的拖拽提示。
- **边界限制**：确保对话框始终在可视窗口范围内，不会完全移出屏幕。
- **窗口响应**：当窗口大小改变时，自动调整对话框位置。
- **防误操作**：拖拽时禁用文本选择，避免误操作。
- **样式优化**：拖拽过程中提供视觉反馈。

### 使用方法

#### 1. 注册指令
在 `main.js` 中注册拖拽指令：

```javascript
import dragDialog from '@/directives/dragDialog.js'

Vue.directive('drag-dialog', dragDialog)
```

#### 2. 在 Dialog 组件中使用
在需要支持拖拽的 Dialog 组件上添加指令：

```vue
<template>
  <el-dialog
    v-drag-dialog
    title="可拖拽对话框"
    :visible.sync="dialogVisible"
    width="50%">
    <span>这是一个可以拖拽的对话框</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
```

#### 3. CSS style 处理
需要在使用支持拖拽的 Dialog 组件文件中添加样式处理：

```css
/* 由于dialog每次打开时会有15vh的marginTop，所以将已经拖拽过的dialog的marginTop设置为0，防止再次打开时位置发生偏移 */
.el-dialog.already-drag {
  margin-top: 0 !important;
}
```

#### 4. 指令文件
指令的具体实现在`src/directives/dragDialog.js`。

### 实现原理

该功能通过 Vue 自定义指令实现，主要包含以下核心逻辑：

1. **初始化**：在指令插入时，为对话框头部添加拖拽图标。
2. **事件监听**：监听鼠标按下、移动、释放事件。
3. **位置计算**：根据鼠标移动距离计算对话框新位置。
4. **边界检测**：确保对话框不超出窗口边界。
5. **状态管理**：管理拖拽状态和样式类。

### 技术实现

- **指令文件**：`src/directives/dragDialog.js`。
- **核心依赖**：原生 DOM API 和 Vue 指令系统。
- **兼容性**：支持所有现代浏览器。

### 注意事项

1. 该指令会自动在对话框头部添加拖拽图标。
2. 拖拽时会临时禁用文本选择功能。
3. 对话框位置会被限制在窗口可视范围内。
4. 支持窗口大小变化时的自动位置调整。
5. 指令会在组件销毁时自动清理事件监听器。

> 如需查看具体实现代码，请参考 `src/directives/dragDialog.js` 文件。


