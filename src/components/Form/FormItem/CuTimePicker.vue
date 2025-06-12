<template>
  <div>
    <el-time-picker
      v-if="itemSettings.timePickerType === 1"
      v-model="value"
      :disabled="itemSettings.isDisabled"
      :is-range="itemSettings.isRange"
      :editable="itemSettings.isEditable"
      :clearable="itemSettings.isClearable"
      :arrow-control="itemSettings.isArrowControl"
      :value-format="'HH:mm:ss'"
      :picker-options="pickerOptions"
      :start-placeholder="itemSettings.startPlaceholder || '开始时间'"
      :end-placeholder="itemSettings.endPlaceholder || '结束时间'"
      :range-separator="itemSettings.rangeSeparator || '-'"
      :prefix-icon="itemSettings.prefixIcon ? itemSettings.prefixIcon : undefined"
      :clear-icon="itemSettings.clearIcon ? itemSettings.clearIcon : undefined"
      v-bind="attrs"
      :placeholder="itemSettings.placeholder || '请选择时间'"
    />
    <el-time-select
      v-if="itemSettings.timePickerType === 2 && !itemSettings.isRange"
      v-model="value"
      :disabled="itemSettings.isDisabled"
      :is-range="itemSettings.isRange"
      :editable="itemSettings.isEditable"
      :clearable="itemSettings.isClearable"
      :arrow-control="itemSettings.isArrowControl"
      :value-format="'HH:mm:ss'"
      :picker-options="pickerOptions"
      :start-placeholder="itemSettings.startPlaceholder || '开始时间'"
      :end-placeholder="itemSettings.endPlaceholder || '结束时间'"
      :range-separator="itemSettings.rangeSeparator || '-'"
      :prefix-icon="itemSettings.prefixIcon ? itemSettings.prefixIcon : undefined"
      :clear-icon="itemSettings.clearIcon ? itemSettings.clearIcon : undefined"
      v-bind="attrs"
      :placeholder="itemSettings.placeholder || '请选择时间'"
    />
    <template v-if="itemSettings.timePickerType === 2 && itemSettings.isRange">
      <el-row>
        <el-col :span="11">
          <el-time-select
            v-model="startValue"
            :disabled="itemSettings.isDisabled"
            :is-range="itemSettings.isRange"
            :editable="itemSettings.isEditable"
            :clearable="itemSettings.isClearable"
            :arrow-control="itemSettings.isArrowControl"
            :value-format="'HH:mm:ss'"
            :picker-options="startPickerOptions"
            :placeholder="itemSettings.startPlaceholder || '开始时间'"
            :range-separator="itemSettings.rangeSeparator || '-'"
            :prefix-icon="itemSettings.prefixIcon ? itemSettings.prefixIcon : undefined"
            :clear-icon="itemSettings.clearIcon ? itemSettings.clearIcon : undefined"
            v-bind="attrs"
          />
        </el-col>
        <el-col :span="2" class="text-align-center">-</el-col>
        <el-col :span="11">
          <el-time-select
            v-model="endValue"
            :disabled="itemSettings.isDisabled"
            :is-range="itemSettings.isRange"
            :editable="itemSettings.isEditable"
            :clearable="itemSettings.isClearable"
            :arrow-control="itemSettings.isArrowControl"
            :value-format="'HH:mm:ss'"
            :picker-options="endPickerOptions"
            :placeholder="itemSettings.endPlaceholder || '结束时间'"
            :range-separator="itemSettings.rangeSeparator || '-'"
            :prefix-icon="itemSettings.prefixIcon ? itemSettings.prefixIcon : undefined"
            :clear-icon="itemSettings.clearIcon ? itemSettings.clearIcon : undefined"
            v-bind="attrs"
          />
        </el-col>
      </el-row>
    </template>
  </div>
  
</template>

<script>
export default {
  name: 'CuTimePicker',
  props: ['itemSettings', 'itemValue'],
  data() {
    return {
      value: null,
      attrs: {}
    }
  },
  computed: {
    startValue: {
      get() {
        return (this.value && this.value[0]) || '';
      },
      set(newValue) {
        this.value = [newValue, this.value[1]]
      }
    },
    endValue: {
      get() {
        return (this.value && this.value[1]) || '';
      },
      set(newValue) {
        this.value = [this.value[0], newValue];
      }
    },
    pickerOptions() {
      const options = {};

      //  任意时间点
      if (this.itemSettings.timePickerType === 1 
        && !this.itemSettings.isRange
        && this.itemSettings.selectableRange
        && this.itemSettings.selectableRange.length === 2
      ) {
        options.selectableRange = `${this.itemSettings.selectableRange[0]} - ${this.itemSettings.selectableRange[1]}`
      }

      // 固定时间点
      if (this.itemSettings.timePickerType === 2 && !this.itemSettings.isRange) {
        options.start = this.itemSettings.start;
        options.end = this.itemSettings.end;
        options.step = this.itemSettings.step;
        options.minTime = this.itemSettings.minTime;
        options.maxTime = this.itemSettings.maxTime;
      }

      return options;
    },
    // 固定时间范围 —— 开始时间
    startPickerOptions() {
      return {
        start: this.itemSettings.startRangeStart,
        end: this.itemSettings.startRangeEnd,
        step: this.itemSettings.startRangeStep,
        minTime: this.itemSettings.startRangeMinTime,
        maxTime: this.itemSettings.startRangeMaxTime,
      };
    },
    // 固定时间范围 —— 结束时间
    endPickerOptions() {
      return {
        start: this.itemSettings.endRangeStart,
        end: this.itemSettings.endRangeEnd,
        step: this.itemSettings.endRangeStep,
        minTime: this.itemSettings.endRangeMinTime,
        maxTime: this.itemSettings.endRangeMaxTime,
      };
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
      deep: true
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
      let defaultValue;
      if (this.itemSettings.isRange) {
        if (this.itemSettings.timePickerType === 1) {
          let start, end;
          if (this.itemSettings.rangeDefaultValue && this.itemSettings.rangeDefaultValue.length === 2) {
            start = this.itemSettings.rangeDefaultValue[0];
            end = this.itemSettings.rangeDefaultValue[1];
            defaultValue = [new Date(`2000 ${start}`), new Date(`2000 ${end}`)];
            return defaultValue;
          }
        } else if (this.itemSettings.timePickerType === 2) {
          return [this.itemSettings.rangeDefaultValueStart || '', this.itemSettings.rangeDefaultValueEnd || ''];
        }
        return ['', ''];
      } else {
        if (this.itemSettings.isDefaultCurrent) {
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          defaultValue = this.itemSettings.timePickerType === 1 ? now : `${hh}:${mm}`;
          return defaultValue;
        }
        if (this.itemSettings.defaultValue) {
          defaultValue = this.itemSettings.timePickerType === 1 ? new Date(`2000 ${this.itemSettings.defaultValue}`) : this.itemSettings.defaultValue;
          console.log('defaultValue=', defaultValue)
          return defaultValue;
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