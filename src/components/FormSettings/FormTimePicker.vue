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
    <!-- 任意时间点选项配置 -->
    <template v-if="form.timePickerType === 1 && form.isRange === 0">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>任意时间点选项配置</span>
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
    <template v-if="form.timePickerType === 2 && form.isRange === 0">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>固定时间点选项配置</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间：">
                <el-time-picker v-model="form.start" value-format="HH:mm:ss" placeholder="开始时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间：">
                <el-time-picker v-model="form.end" value-format="HH:mm:ss" placeholder="结束时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="间隔时间：">
            <el-time-picker v-model="form.step" value-format="HH:mm:ss" placeholder="间隔时间"></el-time-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最小时间
                    <el-tooltip class="item" effect="dark" content="小于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.minTime" value-format="HH:mm:ss" placeholder="最小时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最大时间
                    <el-tooltip class="item" effect="dark" content="大于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.maxTime" value-format="HH:mm:ss" placeholder="最大时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </template>
    <!-- 任意时间范围选项配置 -->
    <template v-if="form.timePickerType === 1 && form.isRange === 1">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>任意时间范围选项配置</span>
        </div>
        <div>
          <el-form-item label-width="180px">
            <template #label>
              <span>
                开始时间可选时间段
                <el-tooltip class="item" effect="dark" content="如果为空默认可选全部时间" placement="top-start">
                  <i class="el-icon-info cursor-pointer"></i>
                </el-tooltip>
                ：
              </span>
            </template>
            <el-time-picker
              is-range
              v-model="form.startSelectableRange"
              value-format="HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
          <el-form-item label-width="180px">
            <template #label>
              <span>
                结束时间可选时间段
                <el-tooltip class="item" effect="dark" content="如果为空默认可选全部时间" placement="top-start">
                  <i class="el-icon-info cursor-pointer"></i>
                </el-tooltip>
                ：
              </span>
            </template>
            <el-time-picker
              is-range
              v-model="form.endSelectableRange"
              value-format="HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
        </div>
      </el-card>
    </template>
    <!-- 固定时间范围选项配置 -->
    <template v-if="form.timePickerType === 2 && form.isRange === 1">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>固定时间范围选项配置 —— 范围的开始时间</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间：">
                <el-time-picker v-model="form.startRangeStart" value-format="HH:mm:ss" placeholder="开始时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间：">
                <el-time-picker v-model="form.startRangeEnd" value-format="HH:mm:ss" placeholder="结束时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="间隔时间：">
            <el-time-picker v-model="form.startRangeStep" value-format="HH:mm:ss" placeholder="间隔时间"></el-time-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最小时间
                    <el-tooltip class="item" effect="dark" content="小于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.startRangeMinTime" value-format="HH:mm:ss" placeholder="最小时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最大时间
                    <el-tooltip class="item" effect="dark" content="大于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.startRangeMaxTime" value-format="HH:mm:ss" placeholder="最大时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </template>
    <template v-if="form.timePickerType === 2 && form.isRange === 1">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>固定时间范围选项配置 —— 范围的结束时间</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始时间：">
                <el-time-picker v-model="form.endRangeStart" value-format="HH:mm:ss" placeholder="开始时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间：">
                <el-time-picker v-model="form.endRangeEnd" value-format="HH:mm:ss" placeholder="结束时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="间隔时间：">
            <el-time-picker v-model="form.endRangeStep" value-format="HH:mm:ss" placeholder="间隔时间"></el-time-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最小时间
                    <el-tooltip class="item" effect="dark" content="小于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.endRangeMinTime" value-format="HH:mm:ss" placeholder="最小时间"></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label>
                  <span>
                    最大时间
                    <el-tooltip class="item" effect="dark" content="大于该时间的时间段将被禁用" placement="top-start">
                      <i class="el-icon-info cursor-pointer"></i>
                    </el-tooltip>
                    ：
                  </span>
                </template>
                <el-time-picker v-model="form.endRangeMaxTime" value-format="HH:mm:ss" placeholder="最大时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </template>
    <!-- 非范围选择 -->
    <el-form-item v-if="form.isRange === 0" label="默认值：">
      <el-row>
        <el-col :span="18">
          <el-time-picker :disabled="form.isDefaultCurrent" v-model="form.defaultValue" placeholder="请选择默认值"></el-time-picker>
        </el-col>
        <el-col :span="6" class="default-current">
          <el-checkbox v-model="form.isDefaultCurrent">当前时间</el-checkbox>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- 范围选择 -->
    <el-form-item v-if="form.isRange === 1" label="默认值：">
      <el-time-picker
        is-range
        v-model="form.rangeDefaultValue"
        value-format="HH:mm:ss"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-time-picker>
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
    <el-form-item v-if="form.isRange === 0" label="占位文本：">
      <el-input v-model="form.placeholder" placeholder="请输入占位文本"></el-input>
    </el-form-item>
    <!-- 范围选择 -->
    <template v-if="form.isRange === 1">
      <el-form-item class="double-line-item" label="开始日期的占位内容：">
        <el-input v-model="form.startPlaceholder" placeholder="请输入开始日期的占位内容"></el-input>
      </el-form-item>
      <el-form-item class="double-line-item" label="结束日期的占位内容：">
        <el-input v-model="form.endPlaceholder" placeholder="请输入结束日期的占位内容"></el-input>
      </el-form-item>
      <el-form-item class="double-line-item" label="选择范围时的分隔符：">
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
    <el-form-item class="double-line-item" label="自定义头部图标：">
      <el-select v-model="form.prefixIcon" placeholder="请选择自定义头部图标">
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
    <el-form-item class="double-line-item" label="自定义清空图标：">
      <el-select v-model="form.clearIcon" placeholder="请选择自定义清空">
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
  </el-form>
</template>
<script>
import { Icon_Options } from '../../constants/index';

export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        timePickerType: 1,
        isRange: 0,
        selectableRange: ['', ''],
        start: '09:00:00',
        end: '18:00:00',
        step: '00:30:00',
        minTime: '00:00:00',
        maxTime: '',
        startSelectableRange: ['', ''],
        endSelectableRange: ['', ''],
        startRangeStart: '09:00:00',
        startRangeEnd: '18:00:00',
        startRangeStep: '00:30:00',
        startRangeMinTime: '00:00:00',
        startRangeMaxTime: '',
        endRangeStart: '09:00:00',
        endRangeEnd: '18:00:00',
        endRangeStep: '00:30:00',
        endRangeMinTime: '00:00:00',
        endRangeMaxTime: '',
        defaultValue: '',
        isDefaultCurrent: false,
        rangeDefaultValue: ['', ''],
        isEditable: 1,
        isClearable: 1,
        placeholder: '',
        startPlaceholder: '',
        endPlaceholder: '',
        rangeSeparator: '',
        isArrowControl: 0,
        prefixIcon: '',
        clearIcon: ''
      },
      flagOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
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
</style>
