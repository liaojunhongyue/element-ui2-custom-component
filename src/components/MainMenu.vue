<template>
  <el-menu
    style="height: 100%;"
    background-color="#545c64"
  >
    <el-menu-item
      v-for="item in menuList"
      :key="item.id"
      :class="{'active-menu': item.path === currentRoutePath}"
      @click="goPage(item)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { findTreeNode } from '../utils/common';

export default {
  data() {
    return {
      menuList: [
        {
          id: '1',
          name: '整体介绍',
          icon: 'el-icon-s-home',
          path: '/'
        },
        {
          id: '2',
          name: '表单配置',
          icon: 'el-icon-s-tools',
          path: '/settings/form',
        },
        {
          id: '3',
          name: '表单展示',
          icon: 'el-icon-document',
          path: '/display/form',
        },
      ],
      currentRoutePath: '/',
    }
  },
  watch: {
    '$route'(to) {
      this.currentRoutePath = to.path;
      const currentMenu = findTreeNode(this.menuList, (n) => n.path == this.currentRoutePath);
      this.$store.commit('setCurrentMenu', currentMenu);
    }
  },
  methods: {
    goPage(item) {
      this.$router.push(item.path);
    }
  }
}
</script>
<style scoped>
.el-menu-item {
  color: #ffffff;
  background-color: #545c64;
}
.el-menu-item.active-menu,
.el-menu-item.active-menu i {
  color: #ffd04b;
}
</style>
