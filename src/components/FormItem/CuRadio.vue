<template>
  <el-radio-group
    v-model="value"
    @change="inputVal()"
    :disabled="itemSettings.isDisabled"
    v-bind="attrs"
  >
    <el-radio
      v-for="item in itemSettings.itemList"
      :key="item.id"
      :label="item.name"
    >
      {{ item.name }}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'CuRadio',
  props: ['itemSettings', 'itemValue'],
  data() {
    return {
      value: '',
      attrs: {}
    }
  },
  mounted() {
    // 设置默认值
    this.value = this.itemValue !== undefined ? this.itemValue : this.getDefaultValue();
  },
  methods: {
    inputVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    },
    // 获取默认选中的值
    getDefaultValue() {
      const defaultItem = this.itemSettings.itemList.find(item => item.isDefault);
      return defaultItem ? defaultItem.name : '';
    }
  }
}
</script> 