<template>
  <el-input-number
    v-model="value"
    @change="inputVal()"
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
  mounted() {
    // 设置默认值
    this.value = this.itemValue !== undefined ? this.itemValue : this.itemSettings.defaultValue;
  },
  methods: {
    inputVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script> 