<template>
  <div>
    <section class="tips" v-if="(formSettings || []).length === 0">请先在表单配置页面进行配置，然后即可展示配置的表单。</section>
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <el-form-item
        v-for="item in formSettings" 
        :key="item.enName"
        :label="`${item.name}：`"
        :prop="item.enName"
      >
        <component 
          :is="item.type !== 'CustomItem' ? `Cu${item.type}` : item.customName"
          :item-settings="item"
          :item-value="form[item.enName]"
          @get-value="getValue"
        ></component>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button type="primary" plain @click="clearValidate('form')">清空校验</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['formSettings'])
  },
  data() {
    return {
      form: {},
      rules: {},
    }
  },
  created() {
    this.formSettings.map((item) => {
      // 处理表单的初始值
      this.$set(this.form, item.enName, undefined);
      // 处理表单验证
      this.$set(this.rules, item.enName, []);
      // 必填
      if (item.isRequired) {
        this.rules[item.enName].push({
          required: true,
          message: `请输入${item.name}`,
          trigger: 'blur'
        })
      }
      // 字数
      if (item.isShowWordLimit) {
        let message = '';
        let limitLength = {}
        if (item.maxlength && !item.minlength) {
          limitLength.max = item.maxlength;
          message = `长度不能超过${item.maxlength}个字符`;
        }
        if (!item.maxlength && item.minlength) {
          limitLength.min = item.minlength;
          message = `长度不能少于${item.minlength}个字符`;
        }
        if (item.maxlength && item.minlength) {
          limitLength = {
            max: item.maxlength,
            min: item.minlength
          }
          message = `长度需要在${item.minlength}-${item.maxlength}个字符之间`;
        }
        this.rules[item.enName].push({
            ...limitLength,
            message: message,
            trigger: 'blur'
          })
      }
    })
    console.log(this.rules)
    this.$nextTick(() => {
      this.$refs.form.clearValidate();
    })
  },
  methods: {
    getValue(enName, value) {
      this.form[enName] = value;
    },
    // 表单-提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交');
        } else {
          return false;
        }
      });
    },
    // 表单-重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 表单-清空校验
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    }
  }
}
</script>
