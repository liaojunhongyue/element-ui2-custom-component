<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="dialog-form">
    <el-form-item label="项目名称：" prop="name">
      <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
    </el-form-item>
    <el-form-item prop="enName">
      <template #label>
        <span>英文名称<el-tooltip class="item" effect="dark" content="项目的英文名称只能包含英文小写字母，表单中每一项的英文名称不允许重复" placement="top-start">
            <i class="el-icon-info cursor-pointer"></i>
          </el-tooltip>：
        </span>
      </template>
      <el-input v-model="form.enName" placeholder="请输入项目英文名称"></el-input>
    </el-form-item>
    <el-form-item label="项目类型：" prop="type">
      <el-select v-model="form.type" placeholder="请选择项目类型">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否禁用：" prop="isDisabled">
      <el-switch v-model="form.isDisabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否必填：" prop="isRequired">
      <el-switch v-model="form.isRequired"></el-switch>
    </el-form-item>
    <template v-if="form.type === 'Input'">
      <FormInput ref="formInput" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'Textarea'">
      <FormTextarea ref="formTextarea" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'InputNumber'">
      <FormInputNumber ref="formInputNumber" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'Radio'">
      <FormRadio ref="formRadio" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'Checkbox'">
      <FormCheckbox ref="formCheckbox" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'Select'">
      <FormSelect ref="formSelect" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'Switch'">
      <FormSwitch ref="formSwitch" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'TimePicker'">
      <FormTimePicker ref="formTimePicker" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'datePicker'">
      <FormDatePicker ref="datePicker" :form-data="form" :form-type="formType" />
    </template>
    <template v-if="form.type === 'dateTimePicker'">
      <FormDateTimePicker ref="dateTimePicker" :form-data="form" :form-type="formType" />
    </template>
  </el-form>
</template>
<script>
import { Form_Type_Options } from '../../constants/index';
import FormInput from './FormInput.vue';
import FormTextarea from './FormTextarea.vue';
import FormInputNumber from './FormInputNumber.vue';
import FormRadio from './FormRadio.vue';
import FormCheckbox from './FormCheckbox.vue';
import FormSelect from './FormSelect.vue';
import FormSwitch from './FormSwitch.vue';
import FormTimePicker from './FormTimePicker.vue';
import FormDatePicker from './FormDatePicker.vue';
import FormDateTimePicker from './FormDateTimePicker.vue';

export default {
  props: ['formShow', 'formType', 'formData', 'tableEnNameList'],
  components: {
    FormInput,
    FormTextarea,
    FormInputNumber,
    FormRadio,
    FormCheckbox,
    FormSelect,
    FormSwitch,
    FormTimePicker,
    FormDatePicker,
    FormDateTimePicker
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        enName: '',
        type: '',
        isDisabled: false,
        isRequired: false,
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ],
        enName: [
          { required: true, message: '请输入项目英文名称', trigger: 'blur' },
          { pattern: /^[a-z]+$/, message: '只能包含英文小写字母', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
      },
      typeOptions: Form_Type_Options,
      formItemMap: {
        'Input': 'formInput',
        'Textarea': 'formTextarea',
        'InputNumber': 'formInputNumber',
        'Radio': 'formRadio',
        'Checkbox': 'formCheckbox',
        'Select': 'formSelect',
        'Switch': 'formSwitch',
        'TimePicker': 'formTimePicker',
        'datePicker': 'formDatePicker',
        'dateTimePicker': 'formDateTimePicker'
      }
    }
  },
  watch: {
    'formShow': {
      handler(newVal) {
        if (newVal && this.formType === 'edit') {
          Object.assign(this.form, this.formData);
        }
      },
      immediate: true
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$refs['form'].validate();
        const validateForm = this.$refs[this.formItemMap[this.form.type]].validateForm;
        if (validateForm && validateForm() === false) {
          return;
        }
        Object.assign(this.form, this.$refs[this.formItemMap[this.form.type]].getValues());
        this.$emit('form-submit', this.form);
      } catch (error) {
        // 滚动到第一个校验失败的字段
        // 找到第一个验证失败的字段
        const firstErrorField = Object.keys(error)[0];
        if (firstErrorField) {
          // 使用 $refs 获取对应的表单项 DOM 元素
          this.$nextTick(() => {
            const formItem = this.$refs['form'].$el.querySelector(`[for="${firstErrorField}"]`).closest('.el-form-item');
            if (formItem) {
              formItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
        }
      }
    }
  }
}
</script>
<style scoped>
.dialog-form {
  padding-right: 5px;
  max-height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
