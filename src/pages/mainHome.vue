<template>
  <div>
    <h2>Element UI 对话框(Dialog)组件增加拖拽功能</h2>
    <p>本项目为 Element UI 的 Dialog 组件提供了可拖拽功能，允许用户通过拖拽对话框头部来移动对话框位置，提升用户体验。</p>
    
    <el-card shadow="hover" style="margin-bottom: 20px;">
      <h3>功能特点</h3>
      <ul>
        <li><b>拖拽图标</b>：在对话框头部自动添加拖拽图标，提供直观的拖拽提示。</li>
        <li><b>边界限制</b>：确保对话框始终在可视窗口范围内，不会完全移出屏幕。</li>
        <li><b>窗口响应</b>：当窗口大小改变时，自动调整对话框位置。</li>
        <li><b>防误操作</b>：拖拽时禁用文本选择，避免误操作。</li>
        <li><b>样式优化</b>：拖拽过程中提供视觉反馈。</li>
      </ul>
    </el-card>

    <el-card shadow="hover" style="margin-bottom: 20px;">
      <h3>使用方法</h3>
      <section>
        <h4>1. 注册指令</h4>
        <p>在<code>main.js</code>中注册拖拽指令：</p>
        <div class="code-wrapper">
          <p>import dragDialog from '@/directives/dragDialog.js'</p>
          <p>Vue.directive('drag-dialog', dragDialog)</p>
        </div>
      </section>
      <section>
        <h4>2. 在 Dialog 组件中使用</h4>
        <p>在需要支持拖拽的 Dialog 组件上添加指令：<code>v-drag-dialog</code></p>
      </section>
      <section>
        <h4>3. CSS style 处理</h4>
        <p>需要在使用支持拖拽的 Dialog 组件文件中添加样式处理：</p>
        <div class="code-wrapper">
<pre>
/* 由于dialog每次打开时会有15vh的marginTop，所以将已经拖拽过的dialog的marginTop设置为0，防止再次打开时位置发生偏移 */
.el-dialog.already-drag {
  margin-top: 0 !important;
}
</pre>
        </div>
      </section>
      <section>
        <h4>4. 指令文件</h4>
        <p>指令的具体实现在<code>src/directives/dragDialog.js</code>。</p>
      </section>
    </el-card>

    <el-card shadow="hover" style="margin-bottom: 20px;">
      <h3>实现原理</h3>
      <p>该功能通过 Vue 自定义指令实现，主要包含以下核心逻辑：</p>
      <ul>
        <li><b>初始化</b>：在指令插入时，为对话框头部添加拖拽图标。</li>
        <li><b>事件监听</b>：监听鼠标按下、移动、释放事件。</li>
        <li><b>位置计算</b>：根据鼠标移动距离计算对话框新位置。</li>
        <li><b>边界检测</b>：确保对话框不超出窗口边界。</li>
        <li><b>状态管理</b>：管理拖拽状态和样式类。</li>
      </ul>
    </el-card>

    <el-card shadow="hover" style="margin-bottom: 20px;">
      <h3>技术实现</h3>
      <ul>
        <li><b>指令文件</b>：<code>src/directives/dragDialog.js</code>。</li>
        <li><b>核心依赖</b>：原生 DOM API 和 Vue 指令系统。</li>
        <li><b>兼容性</b>：支持所有现代浏览器。</li>
      </ul>
    </el-card>

    <el-card shadow="hover" style="margin-bottom: 20px;">
      <h3>注意事项</h3>
      <ol>
        <li>该指令会自动在对话框头部添加拖拽图标。</li>
        <li>拖拽时会临时禁用文本选择功能。</li>
        <li>对话框位置会被限制在窗口可视范围内。</li>
        <li>支持窗口大小变化时的自动位置调整。</li>
        <li>指令会在组件销毁时自动清理事件监听器。</li>
      </ol>
    </el-card>

    <el-card shadow="hover" style="margin-bottom: 20px;">
      <h3>使用指南</h3>
      <p>如需查看具体实现代码，请参考<code>src/directives/dragDialog.js</code>文件。</p>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'mainHome'
}
</script>
<style scoped>
p, ul li, ol li {
  font-size: 14px;
}
code {
  word-break: break-word;
  border-radius: 2px;
  overflow-x: auto;
  background-color: #fff5f5;
  color: #ff502c;
  font-size: .87em;
  padding: .065em .4em;
}
.code-wrapper {
  display: inline-block;
  padding: 5px 20px;
  color: #abb2bf;
  background: #282c34;
}
.code-wrapper pre {
  line-height: 1.8em;
}
</style>