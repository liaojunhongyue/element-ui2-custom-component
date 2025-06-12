<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="默认值：" prop="defaultValue">
      <el-input v-model="form.defaultValue" placeholder="请输入默认值"></el-input>
    </el-form-item>
    <el-form-item class="double-line-item" label="是否显示清除按钮：" prop="isClearable">
      <el-select v-model="form.isClearable" placeholder="请选择是否显示清除按钮">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否限制字数：" prop="isLimitLength">
      <el-select v-model="form.isLimitLength" placeholder="请选择是否限制字数">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <template v-if="form.isLimitLength == 1">
      <el-form-item label="最大字数：" prop="maxlength">
        <el-input-number v-model="form.maxlength" :min="1" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="最小字数：" prop="minlength">
        <el-input-number v-model="form.minlength" :min="1" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item class="double-line-item" label="是否显示输入字数统计：" prop="isShowWordLimit">
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
    <el-form-item class="double-line-item" label="是否显示切换密码图标：" prop="isShowPassword">
      <el-select v-model="form.isShowPassword" placeholder="请选择是否显示切换密码图标">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="double-line-item" label="输入框占位文本：" prop="placeholder">
      <el-input v-model="form.placeholder" placeholder="默认为请输入XXX"></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form-item label="前置图标：" prop="prefixIcon">
          <el-select v-model="form.prefixIcon" clearable placeholder="请选择前置图标">
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
        <el-form-item label="后置图标：" prop="suffixIcon">
          <el-select v-model="form.suffixIcon" clearable placeholder="请选择后置图标">
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
      <el-col :span="8" v-show="form.suffixIcon" class="icon-choose-display">
        <span>所选图标：<i :class="form.suffixIcon"></i></span>
      </el-col>
    </el-row>
    <el-form-item label="前置元素：" prop="prependSlot">
      <el-input v-model="form.prependSlot" placeholder="请输入前置元素"></el-input>
    </el-form-item>
    <el-form-item label="后置元素：" prop="appendSlot">
      <el-input v-model="form.appendSlot" placeholder="请输入后置元素"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { Icon_Options } from '../../../constants/index';

export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        defaultValue: '',
        isClearable: true,
        isLimitLength: false,
        maxlength: 1,
        minlength: 1,
        isShowWordLimit: false,
        isShowPassword: false,
        placeholder: '',
        prefixIcon: '',
        suffixIcon: '',
        prependSlot: '',
        appendSlot: ''
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
<style scoped>
.icon-choose-display {
  line-height: 40px;
}
</style>
