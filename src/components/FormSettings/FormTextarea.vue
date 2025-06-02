<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="默认值：">
      <el-input v-model="form.defaultValue" placeholder="请输入默认值"></el-input>
    </el-form-item>
    <el-form-item label="是否限制字数：">
      <el-select v-model="form.isLimitLength" placeholder="请选择是否限制字数">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <template v-if="form.isLimitLength">
      <el-form-item label="最大字数：">
        <el-input-number v-model="form.maxlength" :min="1" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="最小字数：">
        <el-input-number v-model="form.minlength" :min="1" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item class="double-line-item" label="是否显示输入字数统计：">
        <el-select v-model="form.isShowWordLimit" placeholder="请选择是否显示输入字数统计">
          <el-option
            v-for="item in flagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </template>
    <el-form-item class="double-line-item" label="输入框占位文本：">
      <el-input v-model="form.placeholder" placeholder="默认为请输入XXX"></el-input>
    </el-form-item>
    <el-form-item label="输入框行数：">
      <el-input-number v-model="form.rows" :min="1" :step="1" step-strictly></el-input-number>
    </el-form-item>
    <el-form-item class="double-line-item" label="是否自适应内容高度：">
      <el-select v-model="form.isAutosize" placeholder="请选择是否自适应内容高度">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <template v-if="form.isAutosize">
      <el-form-item class="double-line-item" label="自适应最小行数：">
        <el-input-number v-model="form.minRows" :min="1" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item class="double-line-item" label="自适应最大行数：">
        <el-input-number v-model="form.maxRows" :min="1" :step="1" step-strictly></el-input-number>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        defaultValue: '',
        isLimitLength: false,
        maxlength: 1,
        minlength: 1,
        isShowWordLimit: false,
        placeholder: '',
        rows: 2,
        isAutosize: false,
        minRows: 1,
        maxRows: 1,
      },
      flagOptions: [
        { value: true, label: '是' },
        { value: false, label: '否' }
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
      if (!this.form.isLimitLength) {
        this.form.maxlength = null;
        this.form.minlength = null;
        this.form.isShowWordLimit = false;
      }
      return this.form;
    },
    validateForm() {
      if (this.form.isLimitLength) {
        if (!this.form.maxlength && !this.form.minlength) {
          this.$message({
            type: 'warning',
            message: '如果需要限制字数，则至少填写最大字数或者最小字数中的一处'
          });
          return false;
        }
      }
      if (this.form.isShowWordLimit && !this.form.maxlength) {
        this.$message({
            type: 'warning',
            message: '如果需要显示字数统计，则需要填写最大字数'
          });
          return false;
      }
      return true;
    }
  }
}
</script>
