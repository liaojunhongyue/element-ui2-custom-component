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
          id: '2',
          name: '表单管理',
          icon: 'el-icon-document',
          children: [
            {
              id: '2-1',
              name: '表单配置',
              path: '/form/settings',
            },
            {
              id: '2-2',
              name: '表单展示',
              path: '/form/display',
            }
          ]
        },
        {
          id: '3',
          name: '表格拖拽',
          icon: 'el-icon-s-grid',
          children: [
            {
              id: '3-1',
              name: '普通表格拖拽',
              path: '/table/drag/basic',
            },
            {
              id: '3-2',
              name: '可展开表格拖拽',
              path: '/table/drag/deployable',
            },
            {
              id: '3-3',
              name: '树形表格拖拽',
              path: '/table/drag/treeTableDrag',
            }
          ]
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
        {
          id: '5',
          name: '虚拟滚动',
          icon: 'el-icon-film',
          children: [
            {
              id: '5-1',
              name: '手动实现虚拟滚动',
              path: '/scroll/virtualScroll',
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
