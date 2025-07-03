/**
 * Element UI Dialog 拖拽指令
 * 
 * 该指令为 Element UI 的 Dialog 组件添加拖拽功能，允许用户通过拖拽对话框头部来移动对话框位置。
 * 主要功能包括：
 * 1. 在对话框头部添加拖拽图标
 * 2. 实现鼠标拖拽移动对话框
 * 3. 限制对话框在可视窗口范围内
 * 4. 响应窗口大小变化，自动调整对话框位置
 * 5. 防止拖拽时选中文本
 * 
 * 使用方法：
 * v-drag-dialog
 * 
 * @author Element UI Custom Component
 * @version 1.0.0
 */

export default {
  /**
   * 指令插入时调用，初始化拖拽功能
   * @param {HTMLElement} el - 指令绑定的元素（Dialog 容器）
   */
  inserted(el) {
    // 获取对话框主体和头部元素
    const dialog = el.querySelector('.el-dialog');
    const dialogHeader = el.querySelector('.el-dialog__header');
    
    // 创建拖拽图标元素
    const dragIcon = document.createElement('i');
    dragIcon.className = 'el-icon-rank drag-icon'; // 使用 Element UI 的拖拽图标
    dragIcon.style.cursor = 'move'; // 设置鼠标样式为移动
    dragIcon.style.marginRight = '10px'; // 设置右边距
    dialogHeader.appendChild(dragIcon); // 将图标添加到对话框头部
    
    // 拖拽状态相关变量
    let isDragging = false; // 是否正在拖拽
    let startX, startY; // 鼠标按下时的坐标
    let startLeft, startTop; // 对话框开始拖拽时的位置
    
    /**
     * 鼠标按下事件处理函数
     * 开始拖拽操作，记录初始位置
     * @param {MouseEvent} e - 鼠标事件对象
     */
    const handleMouseDown = (e) => {
      isDragging = true; // 设置拖拽状态为 true
      startX = e.clientX; // 记录鼠标按下时的 X 坐标
      startY = e.clientY; // 记录鼠标按下时的 Y 坐标
      
      // 获取对话框当前的位置信息
      const dialogRect = dialog.getBoundingClientRect();
      startLeft = dialogRect.left; // 记录对话框开始拖拽时的左边距
      startTop = dialogRect.top; // 记录对话框开始拖拽时的上边距
      
      // 防止拖拽时选中文本
      document.onselectstart = () => false;
      document.ondragstart = () => false;
      
      // 添加拖拽中的样式类
      dialog.classList.add('is-dragging');
      
      e.preventDefault(); // 阻止默认行为
    };
    
    /**
     * 鼠标移动事件处理函数
     * 计算新位置并更新对话框位置，同时确保对话框不超出窗口边界
     * @param {MouseEvent} e - 鼠标事件对象
     */
    const handleMouseMove = (e) => {
      if (!isDragging) return; // 如果不在拖拽状态，直接返回
      
      // 计算鼠标移动的距离
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      // 计算对话框的新位置
      let newLeft = startLeft + deltaX;
      let newTop = startTop + deltaY;
      
      // 获取对话框和窗口的尺寸信息
      const dialogWidth = dialog.offsetWidth;
      const dialogHeight = dialog.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const margin = 20; // 边界安全距离
      
      // 限制对话框在窗口范围内，确保不会完全移出可视区域
      newLeft = Math.max(margin, Math.min(newLeft, windowWidth - dialogWidth - margin));
      newTop = Math.max(margin, Math.min(newTop, windowHeight - dialogHeight - margin));
      
      // 更新对话框的位置样式
      dialog.style.position = 'fixed'; // 设置为固定定位
      dialog.style.left = `${newLeft}px`;
      dialog.style.top = `${newTop}px`;
      dialog.classList.add('already-drag'); // 添加已拖拽的样式类
      dialog.style.marginTop = 0; // 清除原有的上边距
    };
    
    /**
     * 鼠标释放事件处理函数
     * 结束拖拽操作，清理相关状态
     */
    const handleMouseUp = () => {
      isDragging = false; // 设置拖拽状态为 false
      
      // 恢复文本选择功能
      document.onselectstart = null;
      document.ondragstart = null;
      
      // 移除拖拽中的样式类
      dialog.classList.remove('is-dragging');
    };
    
    /**
     * 窗口大小变化事件处理函数
     * 当窗口大小改变时，确保对话框仍然在可视区域内
     */
    const handleResize = () => {
      const dialogRect = dialog.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // 检查对话框是否超出窗口边界
      if (dialogRect.right > windowWidth || dialogRect.bottom > windowHeight) {
        // 重新计算对话框位置，确保在窗口内
        const newLeft = Math.max(0, Math.min(parseInt(dialog.style.left), windowWidth - dialogRect.width));
        const newTop = Math.max(0, Math.min(parseInt(dialog.style.top), windowHeight - dialogRect.height));
        
        // 更新对话框位置
        dialog.style.left = `${newLeft}px`;
        dialog.style.top = `${newTop}px`;
      }
    };
    
    // 绑定事件监听器
    dragIcon.addEventListener('mousedown', handleMouseDown); // 拖拽图标鼠标按下事件
    document.addEventListener('mousemove', handleMouseMove); // 文档鼠标移动事件
    document.addEventListener('mouseup', handleMouseUp); // 文档鼠标释放事件
    window.addEventListener('resize', handleResize); // 窗口大小变化事件
    
    // 保存事件处理函数的引用，以便在指令销毁时移除事件监听器
    el._dragDialogHandlers = {
      mouseDown: handleMouseDown,
      mouseMove: handleMouseMove,
      mouseUp: handleMouseUp,
      resize: handleResize
    };
  },
  
  /**
   * 指令解绑时调用，清理事件监听器和相关资源
   * @param {HTMLElement} el - 指令绑定的元素
   */
  unbind(el) {
    // 获取保存的事件处理函数引用
    const { mouseDown, mouseMove, mouseUp, resize } = el._dragDialogHandlers || {};
    const dragIcon = el.querySelector('.drag-icon');
    
    // 移除所有事件监听器，防止内存泄漏
    if (dragIcon && mouseDown) {
      dragIcon.removeEventListener('mousedown', mouseDown);
    }
    if (mouseMove) {
      document.removeEventListener('mousemove', mouseMove);
    }
    if (mouseUp) {
      document.removeEventListener('mouseup', mouseUp);
    }
    if (resize) {
      window.removeEventListener('resize', resize);
    }
  }
};