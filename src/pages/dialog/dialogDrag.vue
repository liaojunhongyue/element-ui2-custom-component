<template>
  <div class="dialog-drag">
    <section>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-dialog
        v-drag-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false">
        <span>这是第一个Dialog的信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  }
};
</script>
<style>
/* 由于dialog每次打开时会有15vh的marginTop，所以将已经拖拽过的dialog的marginTop设置为0，防止再次打开时位置发生偏移 */
.el-dialog.already-drag {
  margin-top: 0 !important;
}
</style>