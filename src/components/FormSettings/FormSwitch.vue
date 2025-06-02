<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="是否默认打开：">
      <el-select v-model="form.isDefaultActive" placeholder="请选择是否默认打开">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="double-line-item" label="打开时的文字描述：">
      <el-input v-model="form.activeValue" placeholder="请输入打开时的文字描述"></el-input>
    </el-form-item>
    <el-form-item class="double-line-item" label="关闭时的文字描述：">
      <el-input v-model="form.inactiveValue" placeholder="请输入关闭时的文字描述"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        isDefaultActive: 0,
        activeValue: '',
        inactiveValue: ''
      },
      flagOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
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
