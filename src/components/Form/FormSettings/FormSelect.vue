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
      <el-input v-model="form.placeholder" placeholder="默认为请选择XXX"></el-input>
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
      <el-row :class="'item-list' + item.frontId" :gutter="10" v-for="item in form.itemList" :key="item.frontId">
        <el-col :span="14">
          <el-form-item label="选项名：" :prop="'item-list-name' + item.frontId">
            <el-input v-model="item.name" placeholder="请输入选项名" @blur="validateItem(form.itemList, false, '', 'item-list-name' + item.frontId)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否默认勾选" :prop="'item-list-default' + item.frontId">
            <el-checkbox v-model="item.isDefault" @change="validateItem(form.itemList, false, '', 'item-list-default' + item.frontId, item.isDefault)"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="handleDelete(item.frontId)" type="text">删除</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 分组选项 -->
    <template v-if="form.selectType == 2">
      <el-row :class="'group-list' + group.frontId" v-for="(group, index) in form.groupItemList" :key="group.frontId">
        <el-form-item label="分组名：" :prop="'group-list-name' + group.frontId">
          <el-row>
            <el-col :span="12">
              <el-input v-model="group.label" placeholder="请输入分组名" @blur="validateGroupName(group.frontId, group.label)"></el-input>
            </el-col>
            <el-col :span="6" class="item-add">
              <el-button class="item-add-button" @click="addGroupItem(index)" plain type="primary">新增选项</el-button>
            </el-col>
            <el-col :span="6" class="item-delete">
              <el-button class="item-delete-button" @click="handleDeleteGroup(group.frontId)" plain type="danger">删除分组</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row :class="'item-list' + group.frontId + item.frontId" :gutter="10" v-for="(item, itemIndex) in group.itemList" :key="item.frontId">
          <el-col :span="14">
            <el-form-item label="选项名：" :prop="'item-list-name' + group.frontId + item.frontId">
              <el-input v-model="item.name" placeholder="请输入选项名" @blur="validateItem(group.itemList, true, group.frontId, 'item-list-name' + group.frontId + item.frontId)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否默认勾选" :prop="'item-list-default' + group.frontId + item.frontId">
              <el-checkbox v-model="item.isDefault" @change="validateItem(group.itemList, true, group.frontId, 'item-list-default'  + group.frontId + item.frontId, item.isDefault)"></el-checkbox>
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
        isClearable: true,
        placeholder: '',
        isMultiple: false,
        selectType: 1,
        itemList: [
          { frontId: 1, name: '', isDefault: false }
        ],
        groupItemList: [
          { frontId: 1, label: '', itemList: [ { frontId: 1, name: '', isDefault: false } ] }
        ],
        isFilterable: false,
        isAllowCreate: false,
      },
      flagOptions: [
        { value: true, label: '是' },
        { value: false, label: '否' }
      ],
      selectTypeOptions: [
        { value: 1, label: '普通选项' },
        { value: 2, label: '分组选项' }
      ],
      itemListFrontId: 1,
      groupListFrontId: 1,
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
    validateGroupName(groupId, groupName) {
      const nameObj = this.$refs['formItem'].$el.querySelector(`.group-list${groupId}`).getElementsByClassName('el-input__inner')[0];
      const nameField = this.$refs['formItem'].fields.find(field => field.prop === `group-list-name${groupId}`);
      if (groupName === '' || groupName === null || groupName === undefined) {
        this.validateError(nameObj, nameField, '请输入分组名');
      } else {
        this.$refs['formItem'].clearValidate('group-list-name' + groupId);
      }
    },
    validateError(itemObj, targetField, errorTips) {
      targetField.validateState = 'error';
      targetField.validateMessage = errorTips;
      itemObj.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    validateItem(itemList, isGroup, groupId, targetItem, isDefault) {
      let result = {
        flag: true,
        tips: ''
      };
      // 检查选项名是否重复
      const nameSet = new Set();
      // 默认选项数量
      let defaultCount = this.getDefaultCount();
      itemList.forEach((item) => {
        let nameObj,nameField,defaultObj,defaultField, nameItem, defaultItem;
        if (isGroup) {
          nameObj = this.$refs['formItem'].$el.querySelector(`.item-list${groupId}${item.frontId}`).getElementsByClassName('el-input__inner')[0];
          nameField = this.$refs.formItem.fields.find(field => field.prop === `item-list-name${groupId}${item.frontId}`);
          defaultObj = this.$refs['formItem'].$el.querySelector(`.item-list${groupId}${item.frontId}`).getElementsByClassName('el-checkbox__inner')[0];
          defaultField = this.$refs.formItem.fields.find(field => field.prop === `item-list-default${groupId}${item.frontId}`);
          nameItem = `item-list-name${groupId}${item.frontId}`;
          defaultItem = `item-list-default${groupId}${item.frontId}`;
        } else {
          nameObj = this.$refs['formItem'].$el.querySelector(`.item-list${item.frontId}`).getElementsByClassName('el-input__inner')[0];
          nameField = this.$refs.formItem.fields.find(field => field.prop === `item-list-name${item.frontId}`);
          defaultObj = this.$refs['formItem'].$el.querySelector(`.item-list${item.frontId}`).getElementsByClassName('el-checkbox__inner')[0];
          defaultField = this.$refs.formItem.fields.find(field => field.prop === `item-list-default${item.frontId}`);
          nameItem = `item-list-name${item.frontId}`;
          defaultItem = `item-list-default${item.frontId}`;
        }
        
        if (!targetItem) {
          // 验证整体表单
          // 先将验证状态设置为通过
          nameField.validateState = 'success';
          nameField.validateMessage = '';
          defaultObj.validateState = 'success';
          defaultObj.validateMessage = '';
          // 验证选项名
          if (item.name === '' || item.name === null || item.name === undefined) {
            this.validateError(nameObj, nameField, '请输入选项名');
            result.flag = false;
          } else if (nameSet.has(item.name)) {
            this.validateError(nameObj, nameField, '选项名不能重复');
            result.flag = false;
          } else {
            nameSet.add(item.name);
          }
          // 检查默认选项数量
          if (!this.form.isMultiple && defaultCount > 1) {
            this.validateError(defaultObj, defaultField, '');
            result.flag = false;
            result.tips = '单选模式下只能设置一个默认选项！'
          }
        } else if (targetItem === nameItem) {
          // 验证选项名
          const nameList = [];
          itemList.filter((i) => i.frontId !== item.frontId).map((v) => nameList.push(v.name));
          if (item.name === '' || item.name === null || item.name === undefined) {
            this.validateError(nameObj, nameField, '请输入选项名');
          } else if (nameList.indexOf(item.name) !== -1) {
            this.validateError(nameObj, nameField, '选项名不能重复');
          } else {
            this.$refs['formItem'].clearValidate(targetItem);
          }
        } else if (targetItem === defaultItem) {
          if (!this.form.isMultiple && defaultCount > 1 && isDefault) {
            this.validateError(defaultObj, defaultField, '');
            this.$message({
              type: 'warning',
              message: '单选模式下只能设置一个默认选项！'
            });
          }
        }
      })
      return result;
    },
    validateForm() {
      let flag = true;
      let tips = '';
      if (this.form.selectType === 1) {
        if (this.form.itemList.length === 0) {
          this.$message({
            type: 'warning',
            message: '至少需要一条可选择项目!'
          });
          flag = false;
        }
        let itemResult = this.validateItem(this.form.itemList, false);
        flag = flag && itemResult.flag;
        tips = itemResult.tips;
      }
      if (this.form.selectType === 2) {
        if (this.form.groupItemList.length === 0) {
          this.$message({
            type: 'warning',
            message: '至少需要保留一条分组!'
          });
          flag = false;
        }
        this.form.groupItemList.forEach((group) => {
          if (group.label === '' || group.label === null || group.label === undefined) {
            const nameObj = this.$refs['formItem'].$el.querySelector(`.group-list${group.frontId}`).getElementsByClassName('el-input__inner')[0];
            const nameField = this.$refs['formItem'].fields.find(field => field.prop === `group-list-name${group.frontId}`);
            this.validateError(nameObj, nameField, '请输入分组名');
            flag = false;
          }
          let itemResult = this.validateItem(group.itemList, true, group.frontId);
          flag = flag && itemResult.flag;
          tips = itemResult.tips;
        })
      }
      if (!flag && tips) {
        this.$message({
          type: 'warning',
          message: tips
        });
      }
      return flag;
    },
    // 获取默认选项数量
    getDefaultCount() {
      let defaultCount = 0;
      // 普通选项
      if (this.form.selectType === 1) {
        this.form.itemList.forEach((item) => {
          if (item.isDefault) {
            defaultCount += 1;
          }
        })
      }
      // 分组选项
      if (this.form.selectType === 2) {
        this.form.groupItemList.forEach((group) => {
          group.itemList.forEach((item) => {
            if (item.isDefault) {
              defaultCount += 1;
            }
          })
        })
      }
      return defaultCount;
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
      this.groupListFrontId = Math.max(...this.form.itemList.map(item => item.frontId)) + 1;
      this.form.groupItemList.push({
        id: this.groupListFrontId,
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
      this.itemListFrontId = Math.max(...this.form.groupItemList[index].itemList.map(item => item.frontId)) + 1;
      this.form.groupItemList[index].itemList.push({
        id: this.itemListFrontId, 
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
