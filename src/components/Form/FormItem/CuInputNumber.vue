<template>
  <el-input-number
    v-model="value"
    :disabled="itemSettings.isDisabled"
    :min="itemSettings.min"
    :max="itemSettings.max"
    :step="itemSettings.step"
    :step-strictly="itemSettings.isStepStrictly === 1"
    :precision="itemSettings.precision"
    :controls="itemSettings.controls"
    :controls-position="itemSettings.controlsPosition || 'default'"
    v-bind="attrs"
    :placeholder="itemSettings.placeholder ? itemSettings.placeholder : '请输入'"
  />
</template>

<script>
export default {
  name: 'CuInputNumber',
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
    // 初始值处理
    this.value = this.itemValue !== undefined ? this.itemValue : this.getDefaultValue();
    this.emitVal();
  },
  methods: {
    // 获取默认值
    getDefaultValue() {
      if (this.itemSettings.defaultValue) {
        return this.itemSettings.defaultValue;
      }
      return '';
    },
    // 向Form派发value值
    emitVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script> 