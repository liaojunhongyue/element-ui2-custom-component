<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="可选择项目：">
      <el-button plain @click="addItem">+ 新增</el-button>
    </el-form-item>
    <el-row :class="'item-list' + item.frontId" :gutter="10" v-for="(item, index) in form.itemList" :key="item.frontId">
      <el-col :span="14">
        <el-form-item label="选项名：" :prop="'item-list-name' + item.frontId">
          <el-input v-model="item.name" placeholder="请输入选项名" @blur="validateItem('item-list-name' + item.frontId)"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否默认勾选">
          <el-checkbox v-model="item.isDefault"></el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-button @click="handleDelete(index)" type="text">删除</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: ['formType', 'formData'],
  data() {
    return {
      form: {
        itemList: [
          { frontId: 1, name: '', isDefault: false }
        ],
      },
      itemListFrontId: 1,
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
    validateError(itemObj, targetField, errorTips) {
      targetField.validateState = 'error';
      targetField.validateMessage = errorTips;
      itemObj.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    validateItem(targetItem) {
      let flag = true;
      // 检查选项名是否重复
      const nameSet = new Set();
      this.form.itemList.forEach((item) => {
        const nameObj = this.$refs.formItem.$el.querySelector(`.item-list${item.frontId}`).getElementsByClassName('el-input__inner')[0];
        const nameField = this.$refs.formItem.fields.find(field => field.prop === `item-list-name${item.frontId}`);
        if (!targetItem) {
          // 验证整体表单
          // 先将验证状态设置为通过
          nameField.validateState = 'success';
          nameField.validateMessage = '';
          // 验证选项名
          if (item.name === '' || item.name === null || item.name === undefined) {
            this.validateError(nameObj, nameField, '请输入选项名');
            flag = false;
          } else if (nameSet.has(item.name)) {
            this.validateError(nameObj, nameField, '选项名不能重复');
            flag = false;
          } else {
            nameSet.add(item.name);
          }
        } else if (targetItem === `item-list-name${item.frontId}`) {
          // 验证选项名
          const nameList = [];
          this.form.itemList.filter((i) => i.frontId !== item.frontId).map((v) => nameList.push(v.name));
          if (item.name === '' || item.name === null || item.name === undefined) {
            this.validateError(nameObj, nameField, '请输入选项名');
          } else if (nameList.indexOf(item.name) !== -1) {
            this.validateError(nameObj, nameField, '选项名不能重复');
          } else {
            this.$refs['formItem'].clearValidate(targetItem);
          }
        }
      })
      return flag;
    },
    validateForm() {
      let flag = true;
      if (this.form.itemList.length === 0) {
        this.$message({
          type: 'warning',
          message: '至少需要一条可选择项目!'
        });
        flag = false;
      }
      if (flag) {
        flag = this.validateItem();
      }
      return flag;
    },
    // 新增选项
    addItem() {
      this.itemListFrontId = Math.max(...this.form.itemList.map(item => item.frontId)) + 1;
      this.form.itemList.push({
        id: this.itemListFrontId,
        name: '',
        isDefault: false
      })
    },
    // 删除选项
    handleDelete(index) {
      if (this.form.itemList.length <= 1) {
        this.$message({
          type: 'warning',
          message: '至少需要一条可选择项目!'
        });
        return;
      }
      this.form.itemList.splice(index, 1);
    }
  }
}
</script>
