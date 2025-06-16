<template>
	<div>
		<p>鼠标移动到表格的行上，按住可进行拖拽。</p>
		<el-table
			ref="table"
			:data="tableData"
			:border="true"
			class="basic-table"
			style="width: 100%">
			<el-table-column
				prop="date"
				label="日期"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				width="180">
			</el-table-column>
			<el-table-column
				prop="address"
				label="地址">
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
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-02',
				name: '张三',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-03',
				name: '李四',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-04',
				name: '王五',
				address: '上海市普陀区金沙江路 1516 弄'
			}]
		}
	},
	mounted() {
    this.setRowDrag();
  },
	methods: {
    setRowDrag() {
      const tableEl = this.$refs.table.$el.querySelector('.el-table__body-wrapper tbody');
      Sortable.create(tableEl, {
        animation: 150,
        handle: '.el-table__row', // 拖拽手柄（整行）
        onEnd: ({ newIndex, oldIndex }) => {
          // 更新数据顺序
          const movedItem = this.tableData.splice(oldIndex, 1)[0];
          this.tableData.splice(newIndex, 0, movedItem);
        }
      });
    }
  }
}
</script>
<style>
.basic-table .el-table__body-wrapper tbody .el-table__row {
	cursor: pointer;
}
</style>