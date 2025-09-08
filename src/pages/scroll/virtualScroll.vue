<template>
  <div class="virtual-scroll" @scroll="handleScroll" ref="scrollContainer">
    <div class="scroll-phantom" :style="{ height: totalHeight + 'px' }"></div>
    <div class="scroll-content" :style="{ transform: `translateY(${offset}px)` }">
      <div v-for="item in visibleData" :key="item.id" class="scroll-item">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { content: '数据1' },
        { content: '数据2' },
        { content: '数据3' },
        { content: '数据4' },
        { content: '数据5' },
        { content: '数据6' },
        { content: '数据7' },
        { content: '数据8' },
        { content: '数据9' },
        { content: '数据10' },
        { content: '数据11' },
        { content: '数据12' },
        { content: '数据13' },
        { content: '数据14' },
        { content: '数据15' },
        { content: '数据16' },
        { content: '数据17' },
        { content: '数据18' },
        { content: '数据19' },
        { content: '数据20' }
      ],
      visibleHeight: 300,
      itemHeight: 50,
      startIndex: 0,   // 起始索引
      endIndex: 10,     // 结束索引
      offset: 0        // 偏移量
    }
  },
  computed: {
    // 可视区域能显示的项数
    visibleCount() {
      return Math.ceil(this.visibleHeight / this.itemHeight)
    },
    // 总高度（用于占位）
    totalHeight() {
      return this.data.length * this.itemHeight
    },
    // 当前可见的数据
    visibleData() {
      return this.data.slice(this.startIndex, this.endIndex)
    }
  },
  mounted() {
    this.updateVisibleData()
  },
  methods: {
    handleScroll() {
      const scrollTop = this.$refs.scrollContainer.scrollTop
      this.startIndex = Math.floor(scrollTop / this.itemHeight)
      this.endIndex = this.startIndex + this.visibleCount
      this.offset = scrollTop - (scrollTop % this.itemHeight)
    },
    updateVisibleData() {
      this.endIndex = this.startIndex + this.visibleCount
    }
  },
  watch: {
    visibleHeight() {
      this.updateVisibleData()
    }
  }
}
</script>

<style>
.virtual-scroll {
  position: relative;
  height: 300px;
  overflow-y: auto;
}

.scroll-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.scroll-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.scroll-item {
  height: 50px; /* 与itemHeight一致 */
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
</style>