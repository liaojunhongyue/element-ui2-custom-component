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
					2. 只能在同一父级节点之间进行拖拽排序，不可以通过拖拽改变现有层级和父级。<br>
					3. 具有记录折叠行的功能。拖拽后，行的展开/折叠状态不会改变。<br>
				</span>
			</template>
		</el-alert>
		<el-table
			ref="table"
			:data="tableData"
			:row-key="rowKey"
			class="tree-table"
			:row-class-name="tableRowClassName"
			:border="true"
			default-expand-all
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @expand-change="handleExpandChange"
		>
			<el-table-column
				prop="id"
				label="ID"
				width="180">
			</el-table-column>
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
				id: '001',
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
				children: [{
					id: '002',
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					children: [{
						id: '003',
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}, {
						id: '004',
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}]
				}, {
					id: '005',
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}]
			}, {
				id: '006',
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				id: '007',
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄',
				children: [{
					id: '008',
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					id: '009',
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}]
			}, {
				id: '010',
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄',
				children: [{
					id: '011',
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					id: '012',
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}]
			}],
      rowKey: 'id',
      flattenTableData: [],
      oldTableRows: [],
      foldRows: []
		}
	},
	mounted() {
		// 处理初始数据，增加parentId属性
		this.tableData = this.addParentIdToTree(this.tableData);
    // 将树形结构的数据扁平化
    this.flattenTableData = this.flattenTree(this.tableData);
		// 拖拽方法
		this.setRowDrag();
	},
	methods: {
    // 扁平化树形结构的数据
    flattenTree(treeData) {
      const result = [];
      function traverse(node) {
        const { children, ...rest } = node;
        result.push(rest);  
        if (children) {
          children.forEach(traverse);
        }
      }
      treeData.forEach(traverse);
      return result;
    },
    // 将扁平化的数据整理成树形结构
    buildTree(flatData) {
      const map = new Map();
      const roots = [];
      // 第一遍：建立ID到节点的映射
      flatData.forEach(item => {
        map.set(item.id, { ...item, children: [] });
      });
      // 第二遍：构建树结构
      flatData.forEach(item => {
        const node = map.get(item.id);
        if (item.parentId === 'top') {
          roots.push(node);
        } else {
          const parent = map.get(item.parentId);
          if (parent) {
            parent.children.push(node);
          }
        }
      });
      return roots;
    },
		// 给数据增加parentId属性
		addParentIdToTree(data, parentId = 'top') {
			return data.map(node => {
				// 创建新节点对象（避免直接修改原对象）
				const newNode = {
					...node,
					parentId: parentId
				};
				// 递归处理子节点
				if (node.children && node.children.length > 0) {
					newNode.children = this.addParentIdToTree(node.children, node.id);
				}
				return newNode;
			});
		},
		// 将parentId放入行的class中
		tableRowClassName({row}) {
			return `parent-id-${row.parentId} item-id-${row.id}`;
		},
    // 获取扁平数据下目标节点的所有子节点
    findAllChildNodes(nodeData, targetItemId) {
      const result = [];
      // 1. 验证目标节点是否存在
      const targetNode = Object.values(nodeData).find(node => 
        node._prevClass.includes(`item-id-${targetItemId}`)
      );
      if (!targetNode) return [];
      // 2. 递归查找所有子节点
      function collectChildren(currentItemId) {
        Object.values(nodeData).forEach(node => {
          const nodeParentMatch = node._prevClass.match(/parent-id-(\S+)/);
          if (nodeParentMatch && nodeParentMatch[1] === currentItemId) {
            const nodeIdMatch = node._prevClass.match(/item-id-(\S+)/);
            if (nodeIdMatch) {
              const nodeId = nodeIdMatch[1];
              result.push(node);
              collectChildren(nodeId); // 递归查找子节点的子节点
            }
          }
        });
      }
      collectChildren(targetItemId);
      return result;
    },
		// 返回带有特定标识符的class
		findParentIdClass(element, target) {
			return [...element.classList].find(className => 
				className.includes(target)
			);
		},
    // 查找后续带有特定class的节点
    findNextSiblingWithClass(nodeList, startIndex, targetClass) {
      // 遍历后续节点
      const childNodes = [];
      for (let i = startIndex + 1; i < nodeList.length; i++) {
        const currentNode = nodeList[i];
        // 检查节点是否包含目标class
        if (currentNode.classList && currentNode.classList.contains(targetClass)) {
          childNodes.push(currentNode);
        }
      }
      return childNodes; // 未找到
    },
    // 切换行的展开/收起状态
    handleExpandChange(row, isExpend) {
      if (isExpend) {
        const rowIndex = this.foldRows.indexOf(row);
        this.foldRows.splice(rowIndex, 1);
      } else if (!isExpend && this.foldRows.indexOf(row) === -1) {
        this.foldRows.push(row);
      }
    },
		// 设置拖拽
		setRowDrag() {
			const tableEl = this.$refs.table.$el.querySelector('.el-table__body-wrapper tbody');
			Sortable.create(tableEl, {
				animation: 150,
        handle: '.el-table__row',
        draggable: '.el-table__row',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        // 开始拖拽时
				onStart: () => {
          // 记录原先行数据
          this.oldTableRows = this.$refs.table.$el.querySelectorAll('tbody tr');
        },
				// 拖拽进行时
        onMove: (evt) => {       
          // 获取拖拽节点以及关联节点的parentId
          const draggedParentId = evt.dragged && this.findParentIdClass(evt.dragged, 'parent-id-') || null;
          const relatedParentId = evt.related && this.findParentIdClass(evt.related, 'parent-id-') || null;
          
          // 判断是否为同级节点，如果不是同级节点则不可以拖拽
          if (draggedParentId !== relatedParentId) {
						evt.willInsertAfter = false;
						evt.dragged && evt.dragged.classList.add('sortable-drag-denied');
            return false;
          }
          return true;
        },
				// 拖拽结束处理
        onEnd: (evt) => {
          if (evt.item) {
            // 移除禁止拖拽的class
            evt.item.classList.remove('sortable-drag-denied');

            // 找到该节点下的所有子节点
            const itemId = this.findParentIdClass(evt.item, 'item-id-').split('-')[2];
            const siblingNodes = this.findAllChildNodes(this.oldTableRows, itemId);
            
            // 获取该节点，以及相关子节点的数据
            const moveLength = [evt.item].length + siblingNodes.length;
            const moveItems = this.flattenTableData.splice(evt.oldIndex, moveLength);

            // 如果是向下移动，索引位置受原本的子节点数据个数影响，需要将原本的子节点数据个数减去，再加上移动到的索引位置的节点的子节点个数加上，从而得到正确的索引位置
            const related = this.oldTableRows[evt.newIndex];
            const relatedId = this.findParentIdClass(related, 'item-id-').split('-')[2];
            const relatedChildren = this.findAllChildNodes(this.oldTableRows, relatedId);
            const newIndex = evt.newIndex > evt.oldIndex ? evt.newIndex - siblingNodes.length + relatedChildren.length : evt.newIndex;

            // 重新整理扁平化的tree数据
            this.flattenTableData.splice(newIndex, 0, ...moveItems);

            // 临时修改row-key，目的是强制渲染整体表格，防止由于key相同造成的子节点数据没有跟随移动
            const tempKey = this.rowKey + '?t=' + Date.now();
            this.rowKey = tempKey;

            // 将扁平化的数据重新生成树形结构
            this.tableData = this.buildTree(this.flattenTableData);

            // 将key恢复原始值，将原先折叠的数据恢复成折叠状态，重新计算布局
            this.$nextTick(() => {
              this.rowKey = 'id';
              this.foldRows.forEach((row) => {
                this.$refs.table.toggleRowExpansion(row, false);
              })
              this.$refs.table.doLayout();
            });

            console.log('最新的tableData数据：', this.tableData);
          }
        }
			});
		},
	}
}
</script>

<style>
/* 拖拽样式 */
.tree-table .sortable-ghost {
  opacity: 0.5;
}
.tree-table .sortable-chosen {
  background: #f5f7fa;
}
/* 禁止拖拽时的鼠标图标 */
.tree-table .sortable-drag-denied {
  cursor: not-allowed;
}
</style>