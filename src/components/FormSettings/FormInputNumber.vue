<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="默认值：">
      <el-input-number v-model="form.defaultValue"></el-input-number>
    </el-form-item>
    <el-form-item label="最小值：">
      <el-input-number v-model="form.min"></el-input-number>
    </el-form-item>
    <el-form-item label="最大值：">
      <el-input-number v-model="form.max"></el-input-number>
    </el-form-item>
    <el-form-item class="double-line-item" label="是否显示控制按钮：">
      <el-switch v-model="form.controls">
      </el-switch>
    </el-form-item>
    <el-form-item v-if="form.controls" label="按钮位置：">
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
        min: undefined,
        max: undefined,
        controls: true,
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
      return this.form;
    },
    validateForm() {
      if (this.form.min !== undefined && this.form.max !== undefined) {
        if (this.form.min > this.form.max) {
          this.$message({
            type: 'warning',
            message: '最小值应该小于最大值'
          });
          return false;
        }
      }
      if (this.form.defaultValue !== undefined) {
        if (this.form.min !== undefined && this.form.defaultValue < this.form.min) {
          this.$message({
            type: 'warning',
            message: '默认值应该大于最小值'
          });
          return false;
        }
        if (this.form.max !== undefined && this.form.defaultValue > this.form.max) {
          this.$message({
            type: 'warning',
            message: '默认值应该小于最大值'
          });
          return false;
        }
      }
      return true;
    }
  }
}
</script>
