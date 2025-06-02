<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="默认值：">
      <el-input-number v-model="form.defaultValue"></el-input-number>
    </el-form-item>
    <el-form-item label="按钮位置：">
      <el-radio-group v-model="form.controlsPosition">
        <el-radio label="default">默认</el-radio>
        <el-radio label="right">右侧</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="精度：">
      <el-input-number v-model="form.precision" :min="1" :step="1" step-strictly></el-input-number>
    </el-form-item>
    <el-form-item label="步数：">
      <el-input-number v-model="form.step"></el-input-number>
    </el-form-item>
    <el-form-item label="是否严格步数：">
      <el-select v-model="form.isStepStrictly" placeholder="请选择是否严格步数">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        defaultValue: undefined,
        controlsPosition: 'default',
        precision: undefined,
        step: undefined,
        isStepStrictly: 0
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
      console.log(this.form)
      return this.form;
    }
  }
}
</script>
