# Element UI 对话框(Dialog)组件增加拖拽功能

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

## 功能介绍

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


