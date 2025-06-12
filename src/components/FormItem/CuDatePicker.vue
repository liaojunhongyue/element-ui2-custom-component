<template>
  <div>
    <el-date-picker
      v-model="value"
      :type="itemSettings.datePickerType"
      :disabled="itemSettings.isDisabled"
      :editable="itemSettings.isEditable"
      :clearable="itemSettings.isClearable"
      :unlink-panels="itemSettings.isUnlinkPanels"
      :value-format="getValueFormat()"
      :format="itemSettings.datePickerType === 'week' ? 'yyyy 第 WW 周' : undefined"
      :start-placeholder="itemSettings.startPlaceholder || '开始日期'"
      :end-placeholder="itemSettings.endPlaceholder || '结束日期'"
      :range-separator="itemSettings.rangeSeparator || '-'"
      :prefix-icon="itemSettings.prefixIcon ? itemSettings.prefixIcon : undefined"
      :clear-icon="itemSettings.clearIcon ? itemSettings.clearIcon : undefined"
      v-bind="attrs"
      :placeholder="itemSettings.placeholder || '请选择日期'"
    />
  </div>
</template>

<script>
export default {
  name: 'CuDatePicker',
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
    // 根据日期选择器类型获取值格式
    getValueFormat() {
      const type = this.itemSettings.datePickerType;
      switch (type) {
        case 'year':
        case 'years':
          return 'yyyy';
        case 'month':
        case 'months':
        case 'monthrange':
          return 'yyyy-MM';
        case 'date':
        case 'dates':
        case 'week':
        case 'daterange':
          return 'yyyy-MM-dd';
        case 'datetime':
        case 'datetimerange':
          return 'yyyy-MM-dd HH:mm:ss';
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