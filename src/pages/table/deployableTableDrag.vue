<template>
  <div>
    <el-alert
			type="info"
			:closable="false"
			style="margin-bottom: 20px;"
    >
      <template #title>
        <span style="white-space: pre-line;">
          1. 鼠标移动到表格的行上，按住可进行拖拽。<br>
          2. 展开的部分不可以进行拖拽。<br>
          3. 行数据在进行拖拽时，先将表格中的每一行均变为收起状态，在拖拽完成后重新展开原先展开的行。<br>
        </span>
      </template>
    </el-alert>
    <el-table
      ref="table"
      :data="tableData"
      row-key="id"
      class="deployable-table"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from 'sortablejs';

export default {
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10330'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10331'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10332'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      expandedRowIds: []
    }
  },
  mounted() {
    this.setRowDrag();
  },
  methods: {
    getCorrectIndex(domIndex) {
      let dataIndex = 0;
      
      for (let i = 0; i < domIndex; i++) {
        // 只统计非展开行
        if (this.oldTableRows[i].classList.contains('el-table__row')) {
          dataIndex++;
        }
      }
      return dataIndex;
    },
    setRowDrag() {
      const tableEl = this.$refs.table.$el.querySelector('.el-table__body-wrapper tbody');
      Sortable.create(tableEl, {
        animation: 150,
        handle: '.el-table__row', // 拖拽手柄（整行）
        // 拖拽开始时：收起所有行并记录状态
        onStart: () => {
          // 1. 保存当前展开状态
          this.expandedRowIds = this.$refs.table.store.states.expandRows.map(row => row.id);
          
          // 2. 记录原先行数据（在拖拽结束时，需要剔除展开行的index，获取到正确的index）
          this.oldTableRows = this.$refs.table.$el.querySelectorAll('tbody tr');

          // 3. 需要收起原先所有的展开行，否则拖拽之后会造成展开行错位的情况
          this.expandedRowIds.forEach(id => {
            const row = this.tableData.find(r => r.id === id);
            if (row) this.$refs.table.toggleRowExpansion(row, false);
          });
        },
        // 拖拽结束后：恢复原有展开状态
        onEnd: (evt) => {
          // 1. 获取修正后的正确索引
          const oldIndex = this.getCorrectIndex(evt.oldIndex);
          const newIndex = this.getCorrectIndex(evt.newIndex);
          
          // 2. 深拷贝数据避免引用问题
          const newData = [...this.tableData];
          const [movedItem] = newData.splice(oldIndex, 1);
          newData.splice(newIndex, 0, movedItem);
          
          // 3. 更新表格数据
          this.tableData = newData;
          console.log('tableData=', this.tableData);
          
          // 4. 恢复展开状态（延迟确保DOM更新）
          this.$nextTick(() => {
            setTimeout(() => {
              this.expandedRowIds.forEach(id => {
                const row = this.tableData.find(r => r.id === id);
                if (row) this.$refs.table.toggleRowExpansion(row, true);
              });
            }, 100);
          });
        }
      });
    }
  }

}
</script>
<style>
.deployable-table .demo-table-expand {
  font-size: 0;
}
.deployable-table .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.deployable-table .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.deployable-table .el-table__body-wrapper tbody .el-table__row {
	cursor: pointer;
}
.deployable-table .sortable-ghost .el-table__expanded-cell {
  display: none !important;
}
.deployable-table .sortable-chosen {
  background: #f5f7fa;
}
</style>