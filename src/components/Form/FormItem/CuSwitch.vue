<template>
  <el-switch
    v-model="value"
    :disabled="itemSettings.isDisabled"
    :active-text="itemSettings.activeValue"
    :inactive-text="itemSettings.inactiveValue"
    v-bind="attrs"
  />
</template>

<script>
export default {
  name: 'CuSwitch',
  props: ['itemSettings', 'itemValue'],
  data() {
    return {
      value: false,
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