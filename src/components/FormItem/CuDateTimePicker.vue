<template>
  <div>
    <el-date-picker
      v-model="value"
      :type="itemSettings.dateTimePickerType"
      :disabled="itemSettings.isDisabled"
      :editable="itemSettings.isEditable"
      :clearable="itemSettings.isClearable"
      :unlink-panels="itemSettings.isUnlinkPanels"
      :value-format="getValueFormat()"
      :format="itemSettings.dateTimePickerType === 'week' ? 'yyyy 第 WW 周' : undefined"
      :start-placeholder="itemSettings.startPlaceholder || '开始日期'"
      :end-placeholder="itemSettings.endPlaceholder || '结束日期'"
      :range-separator="itemSettings.rangeSeparator || '-'"
      :prefix-icon="itemSettings.prefixIcon ? itemSettings.prefixIcon : undefined"
      :clear-icon="itemSettings.clearIcon ? itemSettings.clearIcon : undefined"
      v-bind="attrs"
      :placeholder="itemSettings.placeholder || '请选择日期时间'"
    />
  </div>
</template>

<script>
export default {
  name: 'CuDateTimePicker',
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
    // 根据日期时间选择器类型获取值格式
    getValueFormat() {
      const type = this.itemSettings.dateTimePickerType;
      switch (type) {
        case 'year':
          return 'yyyy';
        case 'month':
          return 'yyyy-MM';
        case 'date':
        case 'week':
          return 'yyyy-MM-dd';
        case 'datetime':
          return 'yyyy-MM-dd HH:mm:ss';
        case 'datetimerange':
          return 'yyyy-MM-dd HH:mm:ss';
        case 'daterange':
          return 'yyyy-MM-dd';
        default:
          return 'yyyy-MM-dd';
      }
    },
    // 向Form派发value值
    emitVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script> 