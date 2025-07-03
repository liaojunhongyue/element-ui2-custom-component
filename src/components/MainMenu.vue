<template>
  <el-menu
    :default-active="activeIndex"
    :default-openeds="openeds"
    :collapse="false"
    style="height: 100%;"
    background-color="#545c64"
  >
    <template v-for="item in menuList">
      <el-menu-item
        v-if="!item.children"
        :key="item.id"
        :index="item.id"
        :class="{'active-menu': item.path === currentRoutePath}"
        @click="goPage(item)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-submenu
        v-else
        :key="item.id"
        :index="item.id"
      >
        <template slot="title">
          <span class="el-subitem-title"><i :class="item.icon"></i><span>{{ item.name }}</span></span>
        </template>
        <el-menu-item
          v-for="subItem in item.children"
          :index="subItem.id"
          :key="subItem.id"
          :class="{'active-menu': subItem.path === currentRoutePath}"
          @click="goPage(subItem)"
        >{{ subItem.name }}</el-menu-item>
      </el-submenu>
    </template>
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
          name: '项目介绍',
          icon: 'el-icon-s-home',
          path: '/'
        },
        {
          id: '4',
          name: '对话框',
          icon: 'el-icon-chat-square',
          children: [
            {
              id: '4-1',
              name: '可拖拽对话框',
              path: '/dialog/drag',
            }
          ]
        },
      ],
      currentRoutePath: '/',
      activeIndex: ''
    }
  },
  computed: {
    openeds() {
      return this.menuList.map(menu => menu.id)
    }
  },
  watch: {
    '$route'(to) {
      this.currentRoutePath = to.path;
      const currentMenu = findTreeNode(this.menuList, (n) => n.path == this.currentRoutePath);
      this.activeIndex = currentMenu.id
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
span.el-subitem-title {
  color: #ffffff;
}
.el-menu-item.active-menu,
.el-menu-item.active-menu i {
  color: #ffd04b;
}
</style>
