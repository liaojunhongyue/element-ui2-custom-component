<template>
  <el-checkbox-group
    v-model="value"
    :disabled="itemSettings.isDisabled"
    v-bind="attrs"
  >
    <el-checkbox
      v-for="item in itemSettings.itemList"
      :key="item.id"
      :label="item.name"
    >
      {{ item.name }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'CuCheckbox',
  props: ['itemSettings', 'itemValue'],
  data() {
    return {
      value: [],
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
    // 获取默认选中的值
    getDefaultValue() {
      return this.itemSettings.itemList
        .filter(item => item.isDefault)
        .map(item => item.name);
    },
    // 向Form派发value值
    emitVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script> 