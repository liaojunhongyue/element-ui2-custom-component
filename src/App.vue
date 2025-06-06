<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-aside
        width="220px"
        height="100%"
      >
        <MainMenu />
      </el-aside>
      <el-container>
        <el-header id="app-header">
          <MainHeader />
        </el-header>
        <el-main id="app-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue';
import MainHeader from './components/MainHeader.vue';

export default {
  name: 'App',
  components: {
    MainMenu,
    MainHeader
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
}
#app-header {
  border-bottom: 1px solid #dcdfe6;
}
#app-main {
  position: relative;
}
#microFrame {
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
}
/* 全局样式 */
.cursor-pointer {
  cursor: pointer;
}
.text-align-center {
  text-align: center;
}
/* element-ui 全局样式修改 */
.el-select {
  width: 100%;
}
div.el-date-editor.el-input {
  width: 100%;
}
div.el-date-editor--timerange.el-input__inner {
  width: 100%;
}
/* 表单全局样式 */
.double-line-item .el-form-item__label {
  line-height: 22px;
}
</style>
