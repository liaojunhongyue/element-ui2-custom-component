<template>
  <div>
    <h2>Element UI 表格（Table）组件增加拖拽功能</h2>
    <p>本项目支持多种基于 Element UI 的表格拖拽功能，具体包括：普通表格拖拽、可展开表格拖拽、树形表格拖拽。相关示例代码位于<code>src/pages/table/</code>目录下。</p>
    
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
        <li>支持 Element UI 的可展开表格（带有展开行的表格）进行拖拽排序。</li>
        <li>拖拽时，所有展开的行会自动收起，拖拽完成后会恢复原先的展开状态。</li>
        <li>仅支持对未展开的主行进行拖拽，展开行不可拖拽。</li>
        <li>拖拽完成后，表格数据顺序自动更新。</li>
        <li>适用于需要展示详情信息的可展开表格场景。</li>
      </ul>
    </el-card>

    <el-card shadow="hover" style="margin-bottom: 20px;">
      <h3>树形表格拖拽（<code>treeTableDrag.vue</code>）</h3>
      <ul>
        <li>支持树形结构（多级嵌套）的表格行拖拽。</li>
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
