<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="选择器形式：">
      <el-radio-group v-model="form.timePickerType">
        <el-radio :label="1">任意时间</el-radio>
        <el-radio :label="2">固定时间</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="double-line-item" label="是否为时间范围选择：">
      <el-select v-model="form.isRange" placeholder="请选择是否为时间范围选择">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 任意时间选项配置 -->
    <template v-if="form.timePickerType === 1 && !form.isRange">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>任意时间选项配置</span>
        </div>
        <div>
          <el-form-item>
            <template #label>
              <span>
                可选时间段
                <el-tooltip class="item" effect="dark" content="如果为空默认可选全部时间" placement="top-start">
                  <i class="el-icon-info cursor-pointer"></i>
                </el-tooltip>
                ：
              </span>
            </template>
            <el-time-picker
              is-range
              v-model="form.selectableRange"
              value-format="HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
        </div>
      </el-card>
    </template>
    <!-- 固定时间点选项配置 -->
    <template v-if="form.timePickerType === 2 && !form.isRange">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>固定时间点选项配置</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间：">
                <el-time-picker v-model="form.start" value-format="HH:mm" format="HH:mm" placeholder="开始时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间：">
                <el-time-picker v-model="form.end" value-format="HH:mm" format="HH:mm" placeholder="结束时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="间隔时间：">
            <el-time-picker v-model="form.step" value-format="HH:mm" format="HH:mm" placeholder="间隔时间"></el-time-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最小时间
                    <el-tooltip class="item" effect="dark" content="小于或等于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.minTime" value-format="HH:mm" format="HH:mm" placeholder="最小时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最大时间
                    <el-tooltip class="item" effect="dark" content="大于或等于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.maxTime" value-format="HH:mm" format="HH:mm" placeholder="最大时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </template>
    <!-- 固定时间范围选项配置 -->
    <template v-if="form.timePickerType === 2 && form.isRange">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>固定时间范围选项配置 —— 范围的开始时间</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间：">
                <el-time-picker v-model="form.startRangeStart" value-format="HH:mm" format="HH:mm" placeholder="开始时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间：">
                <el-time-picker v-model="form.startRangeEnd" value-format="HH:mm" format="HH:mm" placeholder="结束时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="间隔时间：">
            <el-time-picker v-model="form.startRangeStep" value-format="HH:mm" format="HH:mm" placeholder="间隔时间"></el-time-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最小时间
                    <el-tooltip class="item" effect="dark" content="小于或等于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.startRangeMinTime" value-format="HH:mm" format="HH:mm" placeholder="最小时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最大时间
                    <el-tooltip class="item" effect="dark" content="大于或等于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.startRangeMaxTime" value-format="HH:mm" format="HH:mm" placeholder="最大时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </template>
    <template v-if="form.timePickerType === 2 && form.isRange">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>固定时间范围选项配置 —— 范围的结束时间</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间：">
                <el-time-picker v-model="form.endRangeStart" value-format="HH:mm" format="HH:mm" placeholder="开始时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间：">
                <el-time-picker v-model="form.endRangeEnd" value-format="HH:mm" format="HH:mm" placeholder="结束时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="间隔时间：">
            <el-time-picker v-model="form.endRangeStep" value-format="HH:mm" format="HH:mm" placeholder="间隔时间"></el-time-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最小时间
                    <el-tooltip class="item" effect="dark" content="小于或等于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.endRangeMinTime" value-format="HH:mm" format="HH:mm" placeholder="最小时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最大时间
                    <el-tooltip class="item" effect="dark" content="大于或等于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.endRangeMaxTime" value-format="HH:mm" format="HH:mm" placeholder="最大时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </template>
    <!-- 非范围选择 -->
    <el-form-item v-if="!form.isRange" label="默认值：">
      <!-- 任意时间 -->
      <el-row v-if="form.timePickerType === 1">
        <el-col :span="18">
          <el-time-picker
            :disabled="form.isDefaultCurrent"
            v-model="form.defaultValue"
            value-format="HH:mm:ss"
            format="HH:mm:ss"
            placeholder="请选择默认值"
          ></el-time-picker>
        </el-col>
        <el-col :span="6" class="default-current">
          <el-checkbox
            v-model="form.isDefaultCurrent"
            @change="changeDefaultCurrent"
          >当前时间</el-checkbox>
        </el-col>
      </el-row>
      <!-- 固定时间 -->
      <el-row v-if="form.timePickerType === 2">
        <el-col :span="18">
          <el-time-select
            :disabled="form.isDefaultCurrent"
            v-model="form.defaultValue"
            value-format="HH:mm"
            format="HH:mm"
            :picker-options="{
              start: '00:00',
              step: form.step,
              end: '23:59'
            }"
            placeholder="请选择默认值"
          ></el-time-select>
        </el-col>
        <el-col :span="6" class="default-current">
          <el-checkbox
            v-model="form.isDefaultCurrent"
            @change="changeDefaultCurrent"
          >当前时间</el-checkbox>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- 范围选择 -->
    <el-form-item v-if="form.isRange" label="默认值：">
      <!-- 任意时间 -->
      <el-time-picker
        v-if="form.timePickerType === 1"
        is-range
        v-model="form.rangeDefaultValue"
        value-format="HH:mm:ss"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-time-picker>
      <!-- 固定时间 -->
      <el-row v-if="form.timePickerType === 2">
        <el-col :span="11">
          <el-time-select
            v-model="form.rangeDefaultValueStart"
            value-format="HH:mm"
            format="HH:mm"
            :picker-options="{
              start: '00:00',
              step: form.startRangeStep,
              end: '23:59'
            }"
            placeholder="开始时间">
          </el-time-select>
        </el-col>
        <el-col :span="2" class="text-align-center">-</el-col>
        <el-col :span="11">
          <el-time-select
            v-model="form.rangeDefaultValueEnd"
            value-format="HH:mm"
            format="HH:mm"
            :picker-options="{
              start: '00:00',
              step: form.endRangeStep,
              end: '23:59'
            }"
            placeholder="结束时间">
          </el-time-select>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item class="double-line-item" label="文本框是否可输入：">
      <el-select v-model="form.isEditable" placeholder="请选择文本框是否可输入">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="double-line-item" label="是否显示清除按钮：">
      <el-select v-model="form.isClearable" placeholder="请选择是否显示清除按钮">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 非范围选择 -->
    <el-form-item v-if="!form.isRange" label="占位文本：">
      <el-input v-model="form.placeholder" placeholder="请输入占位文本"></el-input>
    </el-form-item>
    <!-- 范围选择 -->
    <template v-if="form.isRange">
      <el-form-item class="double-line-item" label="开始时间的占位内容：">
        <el-input v-model="form.startPlaceholder" placeholder="请输入开始时间的占位内容"></el-input>
      </el-form-item>
      <el-form-item class="double-line-item" label="结束时间的占位内容：">
        <el-input v-model="form.endPlaceholder" placeholder="请输入结束时间的占位内容"></el-input>
      </el-form-item>
      <el-form-item v-if="form.timePickerType === 1" class="double-line-item" label="选择范围时的分隔符：">
        <el-input v-model="form.rangeSeparator" placeholder="请输入选择范围时的分隔符"></el-input>
      </el-form-item>
    </template>
    <el-form-item class="double-line-item" label="是否使用箭头进行时间选择：">
      <el-select v-model="form.isArrowControl" placeholder="请选择是否使用箭头进行时间选择">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item class="double-line-item" label="自定义头部图标：">
          <el-select v-model="form.prefixIcon" clearable placeholder="请选择自定义头部图标">
            <el-option
              v-for="item in iconOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <i :class="item.value"></i>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-show="form.prefixIcon" class="icon-choose-display">
        <span>所选图标：<i :class="form.prefixIcon"></i></span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item class="double-line-item" label="自定义清空图标：">
          <el-select v-model="form.clearIcon" clearable placeholder="请选择自定义清空">
            <el-option
              v-for="item in iconOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <i :class="item.value"></i>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-show="form.clearIcon" class="icon-choose-display">
        <span>所选图标：<i :class="form.clearIcon"></i></span>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { Icon_Options } from '../../../constants/index';

export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        timePickerType: 1,
        isRange: false,
        selectableRange: ['', ''],
        start: '09:00',
        end: '18:00',
        step: '00:30',
        minTime: '00:00',
        maxTime: '',
        startRangeStart: '09:00',
        startRangeEnd: '18:00',
        startRangeStep: '00:30',
        startRangeMinTime: '00:00',
        startRangeMaxTime: '',
        endRangeStart: '09:00',
        endRangeEnd: '18:00',
        endRangeStep: '00:30',
        endRangeMinTime: '00:00',
        endRangeMaxTime: '',
        defaultValue: '',
        isDefaultCurrent: false,
        rangeDefaultValue: ['', ''],
        rangeDefaultValueStart: '',
        rangeDefaultValueEnd: '',
        isEditable: true,
        isClearable: true,
        placeholder: '',
        startPlaceholder: '',
        endPlaceholder: '',
        rangeSeparator: '',
        isArrowControl: false,
        prefixIcon: '',
        clearIcon: ''
      },
      flagOptions: [
        { value: true, label: '是' },
        { value: false, label: '否' }
      ],
      iconOptions: Icon_Options,
    }
  },
  watch: {
    'formType': {
      handler(newVal) {
        if (newVal && this.formType === 'edit') {
          for (const key in this.form) {
            this.form[key] = this.formData[key];
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getValues() {
      return this.form;
    },
    changeDefaultCurrent() {
      if (this.form.isDefaultCurrent) {
        this.form.defaultValue = undefined;
      }
    },
    validateForm() {
      if (this.form.timePickerType === 1 && !this.form.isRange) {
        // 任意时间点
        if (this.form.selectableRange && this.form.selectableRange.length === 2) {
          const [startTime, endTime] = this.form.selectableRange;
          if (startTime && endTime) {
            // 验证默认值是否在可选时间范围内
            if (this.form.isDefaultCurrent || this.form.defaultValue) {
              const defaultTime = this.form.isDefaultCurrent ? 
                new Date().toTimeString().slice(0, 8) : 
                this.form.defaultValue;
              
              if (defaultTime < startTime || defaultTime > endTime) {
                this.$message.warning('默认时间必须在可选时间范围内');
                return false;
              }
            }
          }
        }
      } else if (this.form.timePickerType === 2 && !this.form.isRange) {
        // 固定时间点
        // 验证默认值是否在开始时间和结束时间范围内
        if (this.form.start && this.form.end && (this.form.isDefaultCurrent || this.form.defaultValue)) {
          const defaultTime = this.form.isDefaultCurrent ? 
            new Date().toTimeString().slice(0, 5) : 
            this.form.defaultValue;
          
          if (defaultTime <= this.form.start || defaultTime >= this.form.end) {
            this.$message({
              type: 'warning',
              message: '默认时间必须在开始时间和结束时间范围内（不能等于开始时间或结束时间）',
              duration: 5000
            });
            return false;
          }
        }
        
        // 验证默认值是否在最小时间和最大时间范围内
        if (this.form.minTime && this.form.maxTime && (this.form.isDefaultCurrent || this.form.defaultValue)) {
          const defaultTime = this.form.isDefaultCurrent ? 
            new Date().toTimeString().slice(0, 5) : 
            this.form.defaultValue;
          
          if (defaultTime <= this.form.minTime || defaultTime >= this.form.maxTime) {
            this.$message({
              type: 'warning',
              message: '默认时间必须在最小时间和最大时间范围内（不能等于最小时间或最大时间）',
              duration: 5000
            });
            return false;
          }
        }
      } else if (this.form.timePickerType === 2 && this.form.isRange) {
        // 固定时间范围
        // 验证开始时间
        if (this.form.startRangeStart && this.form.startRangeEnd && this.form.rangeDefaultValueStart) {
          // 验证是否在开始时间和结束时间范围内
          if (this.form.rangeDefaultValueStart <= this.form.startRangeStart || this.form.rangeDefaultValueStart >= this.form.startRangeEnd) {
            this.$message({
              type: 'warning',
              message: '默认值的开始时间必须在固定时间范围选项配置的开始时间和结束时间范围内（不能等于开始时间或结束时间）',
              duration: 5000
            });
            return false;
          }
          
          // 验证是否在最小时间和最大时间范围内
          if (this.form.startRangeMinTime && this.form.startRangeMaxTime) {
            if (this.form.rangeDefaultValueStart <= this.form.startRangeMinTime || this.form.rangeDefaultValueStart >= this.form.startRangeMaxTime) {
              this.$message({
                type: 'warning',
                message: '默认值的开始时间必须在固定时间范围选项配置的最小时间和最大时间范围内（不能等于最小时间或最大时间）',
                duration: 5000
              });
              return false;
            }
          }
        }
        
        // 验证结束时间
        if (this.form.endRangeStart && this.form.endRangeEnd && this.form.rangeDefaultValueEnd) {
          // 验证是否在开始时间和结束时间范围内
          if (this.form.rangeDefaultValueEnd <= this.form.endRangeStart || this.form.rangeDefaultValueEnd >= this.form.endRangeEnd) {
            this.$message({
              type: 'warning',
              message: '默认值的结束时间必须在固定时间范围选项配置的开始时间和结束时间范围内（不能等于开始时间或结束时间）',
              duration: 5000
            });
            return false;
          }
          
          // 验证是否在最小时间和最大时间范围内
          if (this.form.endRangeMinTime && this.form.endRangeMaxTime) {
            if (this.form.rangeDefaultValueEnd <= this.form.endRangeMinTime || this.form.rangeDefaultValueEnd >= this.form.endRangeMaxTime) {
              this.$message({
                type: 'warning',
                message: '默认值的结束时间必须在固定时间范围选项配置的最小时间和最大时间范围内（不能等于最小时间或最大时间）',
                duration: 5000
              });
              return false;
            }
          }
        }
        
        // 验证开始时间是否小于等于结束时间
        if (this.form.rangeDefaultValueStart && this.form.rangeDefaultValueEnd) {
          if (this.form.rangeDefaultValueStart > this.form.rangeDefaultValueEnd) {
            this.$message.warning('默认值的开始时间必须小于或等于结束时间');
            return false;
          }
        }
      }
      return true;
    }
  }
}
</script>
<style scoped>
.default-current {
  text-align: center;
}
.box-card {
  margin-bottom: 20px;
}
.icon-choose-display {
  line-height: 40px;
}
</style>