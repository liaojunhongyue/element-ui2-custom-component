<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item label="可选择项目：">
      <el-button plain @click="addItem">+ 新增</el-button>
    </el-form-item>
    <el-row :class="'item-list' + item.id" :gutter="10" v-for="(item, index) in form.itemList" :key="item.id">
      <el-col :span="14">
        <el-form-item label="选项名：">
          <el-input v-model="item.name" placeholder="请输入选项名"></el-input>
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
          { id: 1, name: '', isDefault: false }
        ],
      },
      itemListId: 1,
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
      let hasItemName = true;
      let changeTime = 0;
      // 检查选项名是否重复
      const nameSet = new Set();
      let hasDuplicate = false;
      // 检查默认选项是否唯一
      let defaultCount = 0;
      this.form.itemList.forEach((item) => {
        if (item.name === '' || item.name === null || item.name === undefined) {
          const itemObj = this.$refs['formItem'].$el.querySelector(`.item-list${item.id}`).getElementsByClassName('el-input__inner')[0];
          itemObj.style.borderColor = '#F56C6C';
          if (changeTime === 0) {
            changeTime += 1;
            itemObj.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          hasItemName = false;
          flag = false;
        } else if (nameSet.has(item.name)) {
          // 如果发现重复的选项名
          hasDuplicate = true;
          const itemObj = this.$refs['formItem'].$el.querySelector(`.item-list${item.id}`).getElementsByClassName('el-input__inner')[0];
          itemObj.style.borderColor = '#F56C6C';
          if (changeTime === 0) {
            changeTime += 1;
            itemObj.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          flag = false;
        } else {
          nameSet.add(item.name);
        }
        // 统计默认选项数量
        if (item.isDefault) {
          defaultCount++;
          if (defaultCount > 1) {
            const itemObj = this.$refs['formItem'].$el.querySelector(`.item-list${item.id}`).getElementsByClassName('el-checkbox__inner')[0];
            if (changeTime === 0) {
              changeTime += 1;
              itemObj.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            flag = false;
          }
        }
      })
      if (!hasItemName) {
        this.$message({
          type: 'warning',
          message: '请输入选项名！'
        });
      }
      if (hasDuplicate) {
        this.$message({
          type: 'warning',
          message: '选项名不能重复！'
        });
      }
      // 验证默认选项唯一性
      if (defaultCount > 1) {
        this.$message({
          type: 'warning',
          message: '只能设置一个默认选项！'
        });
      }
      return flag;
    },
    // 新增选项
    addItem() {
      this.itemListId += 1;
      this.form.itemList.push({
        id: this.itemListId,
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
