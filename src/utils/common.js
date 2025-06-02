/**
 * 将树形结构转换为Map形式
 * @param {Array} tree 树形数据
 * @param {Object} map 存储结果的Map
 * @param {String} keyField 作为key的字段名，默认为'id'
 * @returns {Object} 生成的Map
 */
export function treeToMap(tree, map = {}, keyField = 'id') {
  tree.forEach(node => {
    // 将当前节点存入Map
    map[node[keyField]] = node;
    // 递归处理子节点
    if (node.children && node.children.length) {
      treeToMap(node.children, map, keyField);
    }
  })
  return map
}

/**
 * 从树中查找节点
 * @param {Array} tree 树形数据
 * @param {Function} predicate 判断函数
 * @returns {Object|null} 找到的节点或null
 */
export function findTreeNode(tree, predicate) {
  for (const node of tree) {
    if (predicate(node)) return node
    
    if (node.children && node.children.length) {
      const found = findTreeNode(node.children, predicate)
      if (found) return found
    }
  }
  return null
}