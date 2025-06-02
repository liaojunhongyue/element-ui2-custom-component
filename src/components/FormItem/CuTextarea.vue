<template>
  <el-input
    type="textarea"
    v-model="value"
    @input="inputVal()"
    :disabled="itemSettings.isDisabled"
    :show-word-limit="itemSettings.isShowWordLimit"
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
      attrs: {}
    }
  },
  mounted() {
    this.value = this.itemValue;
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
    inputVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script>
