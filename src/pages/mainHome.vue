<template>
  <div>
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
</style>
