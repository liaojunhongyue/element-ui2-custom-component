<template>
  <el-rate class="custom-rate" v-model="value"></el-rate>
</template>

<script>
export default {
  name: 'CustomRate',
  props: ['itemSettings', 'itemValue'],
  data() {
    return {
      value: null,
      attrs: {}
    }
  },
  watch: {
    itemValue(newVal) {
      this.value = newVal;
    },
    value() {
      this.emitVal();
    },
  },
  mounted() {
    // 设置初始值
    this.value = this.itemValue !== undefined ? this.itemValue : this.itemSettings.isDefaultActive;
    this.emitVal();
  },
  methods: {
    // 向Form派发value值
    emitVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script> 
<style scoped>
.custom-rate {
  margin-top: 10px;
}
</style>