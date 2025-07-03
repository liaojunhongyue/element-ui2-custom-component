<template>
  <div class="main-home">
    <div class="main-home-intro">
      <p>这是一个基于 <code>Element UI</code> 组件库进行二次封装的项目。提供的功能如下：</p>
    </div>
  
    <el-tabs class="main-home-tabs" v-model="activeTab">
      <!-- 可视化的自定义表单配置 -->
      <el-tab-pane label="可视化的自定义表单配置" name="custom-form">
        <h2>可视化的自定义表单配置</h2>

        <p>这是一个基于 <code>Element UI</code> 的自定义表单组件库，提供了一系列可配置的表单组件，支持表单设计、配置和预览功能。</p>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>功能特点</h3>
          <ul>
            <li>支持多种表单组件类型</li>
            <li>组件配置可视化</li>
            <li>实时预览</li>
            <li>表单验证</li>
            <li>配置自定义组件</li>
          </ul>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>支持的组件类型</h3>
          <h4>基础输入组件</h4>
          <ul>
            <li>文本输入框 (<code>Input Textarea</code>)</li>
            <li>数字输入框 (<code>InputNumber</code>)</li>
            <li>开关 (<code>Switch</code>)</li>
          </ul>
          <h4>选择类组件</h4>
          <ul>
            <li>单选框 (<code>Radio</code>)</li>
            <li>复选框 (<code>Checkbox</code>)</li>
            <li>下拉选择框 (<code>Select</code>)</li>
          </ul>
          <h4>日期时间组件</h4>
          <ul>
            <li>日期选择器 (<code>DatePicker</code>)</li>
            <li>时间选择器 (<code>TimePicker</code>)</li>
            <li>日期时间选择器 (<code>DateTimePicker</code>)</li>
          </ul>
          <h4>自定义组件</h4>
          <ul>
            <li>可自行配置的自定义组件</li>
          </ul>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>组件配置项</h3>
          <h4>通用配置</h4>
          <ul>
            <li>组件名称</li>
            <li>是否必填</li>
            <li>是否禁用</li>
            <li>占位文本</li>
            <li>默认值</li>
          </ul>
          <h4>特定组件配置</h4>
          <h5>文本输入框</h5>
          <ul>
            <li>最大/最小长度</li>
            <li>是否显示字数统计</li>
            <li>是否可清空</li>
            <li>前缀/后缀图标</li>
          </ul>
          <h5>数字输入框</h5>
          <ul>
            <li>最小值/最大值</li>
            <li>步长</li>
            <li>精度</li>
            <li>是否严格步数</li>
            <li>是否显示控制按钮</li>
          </ul>
          <h5>单选框/复选框</h5>
          <ul>
            <li>选项列表</li>
            <li>默认选中项</li>
            <li>选项布局</li>
          </ul>
          <h5>下拉选择框</h5>
          <ul>
            <li>选项列表</li>
            <li>是否多选</li>
            <li>是否可清空</li>
            <li>是否可搜索</li>
          </ul>
          <h5>日期时间组件</h5>
          <ul>
            <li>日期/时间格式</li>
            <li>选择范围</li>
            <li>是否显示时间</li>
            <li>是否可清空</li>
          </ul>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>使用说明</h3>
          <h4>安装依赖</h4>
          <pre><code>npm install</code></pre>
          <h4>运行项目</h4>
          <pre><code>npm run serve</code></pre>
          <h4>构建项目</h4>
          <pre><code>npm run build</code></pre>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>项目结构</h3>
          <pre><code style="line-height: 1.8; color: #969696; background: transparent;">
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
          </code></pre>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>使用指南</h3>
          <h4>配置表单</h4>
          <ol>
            <li>在表单配置页面中配置表单项。</li>
            <li>在表单展示中可以看到配置的表单项。</li>
          </ol>
          <h4>配置自定义组件</h4>
          <ol>
            <li>在配置表单项的“项目类型”中选择“<code>CustomItem</code>自定义组件”，自定义组件名称需要与组件的<code>name</code>属性提供的组件名称一致。</li>
            <li>在<code>FormCustom</code>目录下创建自定义组件文件。</li>
          </ol>
          <h4>添加新组件</h4>
          <ol>
            <li>在<code>FormItem</code>目录下创建组件文件。</li>
            <li>在<code>FormSettings</code>目录下创建对应的配置面板。</li>
            <li>在组件中实现必要的属性和方法。</li>
            <li>在配置面板中实现组件的配置项。</li>
          </ol>
        </el-card>
      </el-tab-pane>
      <!-- 表格(Table)组件增加拖拽功能 -->
      <el-tab-pane label="表格(Table)组件增加拖拽功能" name="drag-table">
        <h2>Element UI 表格（Table）组件增加拖拽功能</h2>
        <p>本项目支持多种基于 <code>Element UI</code> 的表格拖拽功能，具体包括：普通表格拖拽、可展开表格拖拽、树形表格拖拽。相关示例代码位于<code>src/pages/table/</code>目录下。</p>
        
        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>普通表格拖拽（<code>basicTableDrag.vue</code>）</h3>
          <ul>
            <li>支持对表格的整行进行拖拽排序。</li>
            <li>拖拽方式为：鼠标移动到表格的行上，按住即可进行拖拽。</li>
            <li>拖拽完成后，数据顺序会自动更新。</li>
            <li>适用于无嵌套、无展开行的简单表格。</li>
          </ul>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>可展开表格拖拽（<code>deployableTableDrag.vue</code>）</h3>
          <ul>
            <li>支持 <code>Element UI</code> 的可展开表格（带有展开行的表格）进行拖拽排序。</li>
            <li>拖拽时，所有展开的行会自动收起，拖拽完成后会恢复原先的展开状态。</li>
            <li>仅支持对未展开的主行进行拖拽，展开行不可拖拽。</li>
            <li>拖拽完成后，表格数据顺序自动更新。</li>
            <li>适用于需要展示详情信息的可展开表格场景。</li>
          </ul>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>树形表格拖拽（<code>treeTableDrag.vue</code>）</h3>
          <ul>
            <li>支持树形结构（多级嵌套）的表格行拖拽排序。</li>
            <li>仅支持同一父级节点下的同级节点之间拖拽，不能跨层级拖拽。</li>
            <li>拖拽后，行的展开/折叠状态不会改变。</li>
            <li>拖拽时会自动处理子节点的跟随移动，保证树结构的正确性。</li>
            <li>适用于有层级结构的数据展示和排序需求。</li>
          </ul>
        </el-card>

        <el-card shadow="hover" style="margin-bottom: 20px;">
          <h3>使用指南</h3>
          <ul>
            <li>以上拖拽功能均基于 <code>[sortablejs](https://github.com/SortableJS/Sortable)</code> 实现。</li>
            <li>仅支持同一父级节点下的同级节点之间拖拽，不能跨层级拖拽。</li>
          </ul>
        </el-card>
      </el-tab-pane>
      <!-- Element UI 对话框(Dialog)组件增加拖拽功能 -->
      <el-tab-pane label="Element UI 对话框(Dialog)组件增加拖拽功能" name="drag-dialog">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'mainHome',
  data() {
    return {
      activeTab: 'custom-form'
    }
  }
}
</script>
<style lang="scss" scoped>
.main-home {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  &-intro {
    height: 45px;
  }
}
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
<style lang="scss">
.main-home-tabs {
  flex: 1;
  height: calc(100% - 45px);
  overflow: hidden;
  .el-tabs__content {
    height: calc(100% - 55px);
    overflow: auto;
  }
}
</style>
