<template>
  <el-checkbox-group
    v-model="value"
    @change="inputVal()"
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
  mounted() {
    // 设置默认值
    this.value = this.itemValue !== undefined ? this.itemValue : this.getDefaultValues();
  },
  methods: {
    inputVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    },
    // 获取默认选中的值
    getDefaultValues() {
      return this.itemSettings.itemList
        .filter(item => item.isDefault)
        .map(item => item.name);
    }
  }
}
</script> 