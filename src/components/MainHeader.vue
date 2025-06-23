<template>
  <div>
    <el-breadcrumb separator="/" style="line-height: 60px;">
      <el-breadcrumb-item>{{ currentMenu && currentMenu.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['currentMenu'])
  },
}
</script>
<style scoped>

</style>
