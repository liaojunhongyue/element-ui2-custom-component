<template>
  <el-input
    type="textarea"
    v-model="value"
    :disabled="itemSettings.isDisabled"
    :show-word-limit="itemSettings.isShowWordLimit"
    :autosize="itemSettings.isAutosize ? { minRows: itemSettings.minRows, maxRows: itemSettings.maxRows } : false"
    v-bind="attrs"
    :placeholder="itemSettings.placeholder ? itemSettings.placeholder : `请输入${itemSettings.name}`"
  >
  </el-input>
</template>
<script>
export default {
  name: 'CuTextarea',
  props: ['itemSettings', 'itemValue'],
  data() {
    return {
      value: '',
      attrs: {},
      autosizeSettings: {
        minRows: 1,
        maxRows: 3
      }
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

    if (this.itemSettings.isLimitLength) {
      // 最小字数
      if (this.itemSettings.minlength) {
        this.attrs.minlength = this.itemSettings.minlength;
      }
      // 最大字数
      if (this.itemSettings.maxlength) {
        this.attrs.maxlength = this.itemSettings.maxlength;
      }
    }
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
