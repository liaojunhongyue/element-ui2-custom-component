<template>
  <el-form ref="formItem" :model="form" label-width="120px" :rules="rules">
    <el-form-item class="double-line-item" label="自定义组件名称：" prop="customName">
			<el-input v-model="form.customName" placeholder="请输入自定义组件名称"></el-input>
    </el-form-item>
		<el-row>
			<p class="discription">自定义组件用于自行开发的定制化表单组件，自定义组件名称需要与组件的 name 属性提供的组件名称一致。</p>
		</el-row>
  </el-form>
</template>
<script>
export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        customName: ''
      },
			rules: {
        customName: [
          { required: true, message: '请输入自定义组件名称', trigger: 'blur' },
					{ pattern: /^[a-zA-Z]+$/, message: '只能包含英文小写字母', trigger: 'blur' }
        ]
      },
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
		async validateForm() {
      try {
        await this.$refs['formItem'].validate();
        return true;
      } catch (error) {
        // 滚动到第一个校验失败的字段
        // 找到第一个验证失败的字段
        const firstErrorField = Object.keys(error)[0];
        if (firstErrorField) {
          // 使用 $refs 获取对应的表单项 DOM 元素
          this.$nextTick(() => {
            const formItem = this.$refs['formItem'].$el.querySelector(`[for="${firstErrorField}"]`).closest('.el-form-item');
            if (formItem) {
              formItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
        }
				return false;
      }
    }
  }
}
</script>
<style scope>
.discription {
	padding-left: 120px;
	margin: 0;
	line-height: 22px;
	font-size: 12px;
	color: #999999;
}
</style>
