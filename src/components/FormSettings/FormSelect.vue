<template>
  <el-form ref="formItem" :model="form" label-width="120px">
    <el-form-item class="double-line-item" label="是否显示清除按钮：">
      <el-select v-model="form.isClearable" placeholder="请选择是否显示清除按钮">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="double-line-item" label="输入框占位文本：">
      <el-input v-model="form.placeholder" placeholder="默认为请输入XXX"></el-input>
    </el-form-item>
    <el-form-item label="是否是多选：">
      <el-select v-model="form.isMultiple" placeholder="请选择是否是多选">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目形式：">
      <el-row>
        <el-col :span="18">
          <el-select v-model="form.selectType" placeholder="请选择项目形式">
            <el-option
              v-for="item in selectTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="item-add">
          <el-button v-if="form.selectType == 1" class="item-add-button" plain @click="addItem">新增选项</el-button>
          <el-button v-if="form.selectType == 2" class="item-add-button" plain @click="addGroup">新增分组</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- 普通选项 -->
    <template v-if="form.selectType == 1">
      <el-row :class="'item-list' + item.id" :gutter="10" v-for="item in form.itemList" :key="item.id">
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
          <el-button @click="handleDelete(item.id)" type="text">删除</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 分组选项 -->
    <template v-if="form.selectType == 2">
      <el-row :class="'group-list' + group.id" v-for="(group, index) in form.groupItemList" :key="group.id">
        <el-form-item label="分组名：">
          <el-row>
            <el-col :span="12">
              <el-input v-model="group.label" placeholder="请输入分组名"></el-input>
            </el-col>
            <el-col :span="6" class="item-add">
              <el-button class="item-add-button" @click="addGroupItem(index)" plain type="primary">新增选项</el-button>
            </el-col>
            <el-col :span="6" class="item-delete">
              <el-button class="item-delete-button" @click="handleDeleteGroup(group.id)" plain type="danger">删除分组</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row :class="'item-list' + group.id + item.id" :gutter="10" v-for="(item, itemIndex) in group.itemList" :key="item.id">
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
            <el-button @click="handleDeleteGroupItem(index, itemIndex)" type="text">删除</el-button>
          </el-col>
        </el-row>
      </el-row>
    </template>
    <el-form-item label="是否可搜索：">
      <el-select v-model="form.isFilterable" placeholder="请选择是否可搜索">
        <el-option
          v-for="item in flagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="double-line-item" label="是否可创建条目：">
      <el-select v-model="form.isAllowCreate" placeholder="请选择是否可创建条目">
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
        isClearable: 1,
        placeholder: '',
        isMultiple: 0,
        selectType: 1,
        itemList: [
          { id: 1, name: '', isDefault: false }
        ],
        groupItemList: [
          { id: 1, label: '', itemList: [ { id: 1, name: '', isDefault: false } ] }
        ],
        isFilterable: 0,
        isAllowCreate: 0,
      },
      flagOptions: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      selectTypeOptions: [
        { value: 1, label: '普通选项' },
        { value: 2, label: '分组选项' }
      ],
      itemListId: 1,
      groupListId: 1,
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
      let hasItemName = true;
      let changeTime = 0;
      if (this.form.selectType == 1) {
        if (this.form.itemList.length === 0) {
          this.$message({
            type: 'warning',
            message: '至少需要一条可选择项目!'
          });
          flag = false;
        }
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
          }
        })
      }
      if (this.form.selectType == 2) {
        if (this.form.groupItemList.length === 0) {
          this.$message({
            type: 'warning',
            message: '至少需要保留一条分组!'
          });
          flag = false;
        }
        this.form.groupItemList.forEach((group) => {
          if (group.label === '' || group.label === null || group.label === undefined) {
            const itemObj = this.$refs['formItem'].$el.querySelector(`.group-list${group.id}`).getElementsByClassName('el-input__inner')[0];
            itemObj.style.borderColor = '#F56C6C';
            if (changeTime === 0) {
              changeTime += 1;
              itemObj.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            hasItemName = false;
            flag = false;
            group.itemList.forEach((item) => {
              if (item.name === '' || item.name === null || item.name === undefined) {
                const itemObj = this.$refs['formItem'].$el.querySelector(`.item-list${group.id}${item.id}`).getElementsByClassName('el-input__inner')[0];
                itemObj.style.borderColor = '#F56C6C';
                if (changeTime === 0) {
                  changeTime += 1;
                  itemObj.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                hasItemName = false;
                flag = false;
              }
            })
          }
        })
      }
      
      if (this.form.selectType == 1 && !hasItemName) {
        this.$message({
          type: 'warning',
          message: '请输入选项名！'
        });
      }
      
      if (this.form.selectType == 2 && !hasItemName) {
        this.$message({
          type: 'warning',
          message: '请输入分组名或选项名！'
        });
      }
      return flag;
    },
    // 新增普通选项
    addItem() {
      this.itemListId += 1;
      this.form.itemList.push({
        id: this.itemListId,
        name: '',
        isDefault: false
      })
    },
    // 删除普通选项
    handleDelete(id) {
      if (this.form.itemList.length <= 1) {
        this.$message({
          type: 'warning',
          message: '至少需要一条可选择项目!'
        });
        return;
      }
      const itemIndex = this.form.itemList.findIndex(item => item['id'] === id);
      this.form.itemList.splice(itemIndex, 1);
    },
    // 新增分组
    addGroup() {
      this.groupListId += 1;
      this.form.groupItemList.push({
        id: this.groupListId,
        itemList: [ { id: 1, name: '', isDefault: false } ]
      })
    },
    // 删除分组
    handleDeleteGroup(id) {
      if (this.form.groupItemList.length <= 1) {
        this.$message({
          type: 'warning',
          message: '至少需要保留一条分组!'
        });
        return;
      }
      const itemIndex = this.form.groupItemList.findIndex(item => item['id'] === id);
      this.form.groupItemList.splice(itemIndex, 1);
    },
    // 新增分组中的选项
    addGroupItem(index) {
      const maxId = Math.max(...this.form.groupItemList[index].itemList.map(item => item.id));
      this.form.groupItemList[index].itemList.push({
        id: maxId + 1, 
        name: '', 
        isDefault: false
      })
    },
    // 删除分组中的选项
    handleDeleteGroupItem(index, itemIndex) {
      if (this.form.groupItemList[index].itemList.length <= 1) {
        this.$message({
          type: 'warning',
          message: '分组中至少需要保留一条可选择项目!'
        });
        return;
      }
      this.form.groupItemList[index].itemList.splice(itemIndex, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-add, .item-delete {
  text-align: right;
  &-button{
    width: 90%;
  }
}
</style>
