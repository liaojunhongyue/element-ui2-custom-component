<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="选择器形式：">
      <el-select v-model="form.dateTimePickerType" placeholder="请选择选择器形式" :clearable="false" @change="changeDateTimePickerType">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="默认值：">
      <el-date-picker
        v-model="form.defaultValue"
        :type="form.dateTimePickerType"
        :value-format="typeFormatMap[form.dateTimePickerType]"
        :format="form.dateTimePickerType === 'week' ? 'yyyy 第 WW 周' : undefined"
        start-placeholder="开始"
        end-placeholder="结束"
        placeholder="选择默认值"
      ></el-date-picker>
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
    <el-form-item v-if="rangeTypeList.indexOf(form.dateTimePickerType) === -1" label="占位文本：">
      <el-input v-model="form.placeholder" placeholder="请输入占位文本"></el-input>
    </el-form-item>
    <template v-if="rangeTypeList.indexOf(form.dateTimePickerType) !== -1">
      <el-form-item class="double-line-item" label="开始日期的占位内容：">
        <el-input v-model="form.startPlaceholder" placeholder="请输入开始日期的占位内容"></el-input>
      </el-form-item>
      <el-form-item class="double-line-item" label="结束日期的占位内容：">
        <el-input v-model="form.endPlaceholder" placeholder="请输入结束日期的占位内容"></el-input>
      </el-form-item>
      <el-form-item class="double-line-item" label="选择范围时的分隔符：">
        <el-input v-model="form.rangeSeparator" placeholder="请输入选择范围时的分隔符"></el-input>
      </el-form-item>
      <el-form-item class="double-line-item">
        <template #label>
          <span>
            是否取消范围选择的联动
            <el-tooltip class="item" effect="dark" content="是否在范围选择器里取消两个日期面板之间的联动" placement="top-start">
              <i class="el-icon-info cursor-pointer"></i>
            </el-tooltip>
            ：
          </span>
        </template>
        <el-select v-model="form.isUnlinkPanels" placeholder="请选择是否取消范围选择器的联动">
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
    </template>
  </el-form>
</template>
<script>
import { Icon_Options } from '../../constants/index';

export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        dateTimePickerType: 'date',
        defaultValue: '',
        defaultTime: '',
        isEditable: true,
        isClearable: true,
        placeholder: '',
        startPlaceholder: '',
        endPlaceholder: '',
        rangeSeparator: '',
        isUnlinkPanels: false,
        prefixIcon: '',
        clearIcon: ''
      },
      typeList: [
        { value: 'year', label: '年份 year' },
        { value: 'month', label: '月份 month' },
        { value: 'date', label: '日期 date' },
        { value: 'week', label: '周 week' },
        { value: 'datetime', label: '日期时间 datetime' },
        { value: 'datetimerange', label: '日期时间范围 datetimerange' },
        { value: 'daterange', label: '日期范围 daterange' },
      ],
      typeFormatMap: {
        'year': 'yyyy',
        'month': 'yyyy-MM',
        'date': 'yyyy-MM-dd',
        'week': 'yyyy-MM-dd',
        'datetime': 'yyyy-MM-dd HH:mm:ss',
        'datetimerange': 'yyyy-MM-dd HH:mm:ss',
        'daterange': 'yyyy-MM-dd'
      },
      rangeTypeList: ['datetimerange', 'daterange'],
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
    // 修改选择器形式
    changeDateTimePickerType() {
      this.form.defaultValue = '';
    }
  }
}
</script>
