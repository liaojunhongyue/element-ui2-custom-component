<template>
  <el-input
    v-model="value"
    :disabled="itemSettings.isDisabled"
    :clearable="itemSettings.isClearable"
    :show-word-limit="itemSettings.isShowWordLimit"
    :show-password="itemSettings.isShowPassword"
    v-bind="attrs"
    :placeholder="itemSettings.placeholder ? itemSettings.placeholder : `请输入${itemSettings.name}`"
  >
    <template v-if="itemSettings.prependSlot" slot="prepend">{{ itemSettings.prependSlot }}</template>
    <template v-if="itemSettings.appendSlot" slot="append">{{ itemSettings.appendSlot }}</template>
  </el-input>
</template>
<script>
export default {
  name: 'CuInput',
  props: ['itemSettings', 'itemValue'],
  data() {
    return {
      attrs: {},
      value: ''
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

    // 字数属性处理
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
    // 图标属性处理
    if (this.itemSettings.prefixIcon) {
      this.attrs['prefix-icon'] = this.itemSettings.prefixIcon;
    }
    if (this.itemSettings.suffixIcon) {
      this.attrs['suffix-icon'] = this.itemSettings.suffixIcon;
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
