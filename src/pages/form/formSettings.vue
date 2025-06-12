<template>
  <div class="form-settings">
    <div class="form-settings-header">
      <el-button type="primary" plain @click="showDialog('add')">新增表单项</el-button>
    </div>
    <div class="form-settings-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        height="100%">
        <el-table-column
          prop="name"
          label="表单项名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="enName"
          label="表单项英文名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="表单项类型"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ formTypeMap[scope.row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isDisabled"
          label="是否禁用"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isDisabled ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isRequired"
          label="是否必填"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.isRequired ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button class="cursor-pointer" @click="showDialog('edit', scope.row)" type="text" size="small">编辑</el-button>
            <el-button class="cursor-pointer" @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑表单项 -->
    <el-dialog
      :title="dialogTypeMap[dialogType] + '表单项'"
      :visible.sync="dialogVisible"
      width="50%">
      <FormDialog
        ref="formDialog"
        v-if="dialogVisible"
        :form-show="dialogVisible"
        :form-type="dialogType"
        :form-data="formData"
        :table-en-name-list="tableEnNameList"
        @form-submit="formSubmit"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDialog()">取 消</el-button>
        <el-button @click="submitDialog()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { Form_Type_Options } from '../../constants/index';
import FormDialog from '../../components/Form/FormSettings/FormDialog.vue';

export default {
  computed: {
    ...mapState(['formSettings'])
  },
  data() {
    return {
      tableData: [],
      tableEnNameList: [],
      tableMaxId: 0,
      dialogVisible: false,
      dialogType: 'add',
      dialogTypeMap: {
        'add': '新增',
        'edit': '编辑'
      },
      formData: {},
      formTypeMap: {},
      editRowId: null,
    }
  },
  components: {
    FormDialog
  },
  mounted() {
    Form_Type_Options.forEach((v) => {
      this.formTypeMap[v.value] = v.label;
    })
    this.tableData = this.formSettings;
    this.tableEnNameList = this.formSettings.map((item) => item.enName);
  },
  methods: {
    // 展示新增/编辑弹窗
    showDialog(type, row) {
      this.dialogType = type;
      if (this.dialogType === 'edit') {
        this.editRowId = row.id;
        this.formData = JSON.parse(JSON.stringify(row));
      }
      this.dialogVisible = true;
    },
    // 隐藏新增/编辑弹窗
    hideDialog() {
      this.dialogVisible = false;
    },
    // 弹窗-确定
    submitDialog() {
      this.$refs.formDialog.submitForm();
    },
    // 检查表单的英文名称是否有重复
    validEnName(enName) {
      this.tableEnNameList = this.tableData.map((item) => item.enName);
      if (this.tableEnNameList.indexOf(enName) !== -1) {
        return false;
      }
      return true;
    },
    // 提交表单
    formSubmit(form) {
      if (this.dialogType === 'add') {
        // 检查新增的表单项名称是否有重复
        if (!this.validEnName(form.enName)) {
          this.$message({
            type: 'warning',
            message: '表单中每一项的英文名称不允许重复!'
          });
          return;
        }
        // 新增
        // 处理id（由于没有后端，暂且这样处理）
        if (this.tableData.length > 0) {
          this.tableMaxId = Math.max(...this.tableData.map((item) => item.id)) + 1;
        } else {
          this.tableMaxId = 1;
        }
        form.id = this.tableMaxId;
        // 将数据放入table中
        console.log(form)
        this.tableData.push(form);
      } else if (this.dialogType === 'edit') {
        // 编辑
        const formIndex = this.tableData.findIndex(item => item['id'] === form.id);
        // 检查新增的表单项名称是否有重复
        let isRepeatEnName = false;
        this.tableData.some((item, index) => {
          if (index !== formIndex && item.enName === form.enName) {
            isRepeatEnName = true;
            return true;
          }
          return false;
        })
        if (isRepeatEnName) {
          this.$message({
            type: 'warning',
            message: '表单中每一项的英文名称不允许重复!'
          });
          return;
        }
        this.tableData.splice(formIndex, 1, form);
      }
      this.dialogVisible = false;
      this.$store.commit('setFormSettings', this.tableData);
    },
    // 删除表格项
    handleDelete(id) {
      this.$confirm('请确认是否删除该表单项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        const formIndex = this.tableData.findIndex(item => item['id'] === id);
        this.tableData.splice(formIndex, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.tableEnNameList = this.tableData.map((item) => item.enName);
        this.$store.commit('setFormSettings', this.tableData);
      }).catch(() => {});
    }
  }
}
</script>
<style lang="scss" scoped>
.form-settings {
  height: 100%;
  &-header {
    height: 60px;
    text-align: right;
  }
  &-content {
    height: calc(100% - 60px);
  }
}
</style>