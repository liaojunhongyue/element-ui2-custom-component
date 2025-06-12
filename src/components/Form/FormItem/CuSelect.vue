<template>
  <el-select
    v-model="value"
    :disabled="itemSettings.isDisabled"
    :clearable="itemSettings.isClearable"
    :multiple="itemSettings.isMultiple"
    :filterable="itemSettings.isFilterable"
    :allow-create="itemSettings.isAllowCreate"
    v-bind="attrs"
    :placeholder="itemSettings.placeholder ? itemSettings.placeholder : '请选择'"
  >
    <!-- 普通选项 -->
    <template v-if="itemSettings.selectType === 1">
      <el-option
        v-for="item in itemSettings.itemList"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      />
    </template>
    <!-- 分组选项 -->
    <template v-else-if="itemSettings.selectType === 2">
      <el-option-group
        v-for="group in itemSettings.groupItemList"
        :key="group.id"
        :label="group.label"
      >
        <el-option
          v-for="item in group.itemList"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-option-group>
    </template>
  </el-select>
</template>

<script>
export default {
  name: 'CuSelect',
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
    value: {
      handler() {
        this.emitVal();
      },
      deep: true,    
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
      if (this.itemSettings.isMultiple) {
        // 多选模式
        if (this.itemSettings.selectType === 1) {
          return this.itemSettings.itemList
            .filter(item => item.isDefault)
            .map(item => item.name);
        } else {
          // 分组模式
          return this.itemSettings.groupItemList
            .flatMap(group => group.itemList)
            .filter(item => item.isDefault)
            .map(item => item.name);
        }
      } else {
        // 单选模式
        if (this.itemSettings.selectType === 1) {
          const defaultItem = this.itemSettings.itemList.find(item => item.isDefault);
          return defaultItem ? defaultItem.name : '';
        } else {
          // 分组模式
          const defaultItem = this.itemSettings.groupItemList
            .flatMap(group => group.itemList)
            .find(item => item.isDefault);
          return defaultItem ? defaultItem.name : '';
        }
      }
    },
    // 向Form派发value值
    emitVal() {
      this.$emit('get-value', this.itemSettings.enName, this.value);
    }
  }
}
</script> 