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
