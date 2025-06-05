<template>
  <el-switch
    v-model="value"
    @change="inputVal()"
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
  mounted() {
    // 设置默认值
    this.value = this.itemValue !== undefined ? this.itemValue : this.itemSettings.isDefaultActive;
  },
  methods: {
    inputVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script> 