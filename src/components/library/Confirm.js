import { createVNode, render } from 'vue'
import JConfirm from './j-confirm'

// 准备DOM容器
const div = document.createElement('div')
div.setAttribute('class', 'j-confirm-container')
document.body.appendChild(div)

// 该函数渲染Confirm组件，标题和文本
// 函数的返回值是promise对象
export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    const submitCallback = () => {
      // 点击确认按钮，触发resolve同时销毁组件
      render(null, div)
      resolve()
    }
    const cancelCallback = () => {
      // 点击取消按钮，触发reject同时销毁组件
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 将JConfirm组件编译为虚拟节点vnode => createVNode(组件, 属性对象)
    const vnode = createVNode(JConfirm, { title, text, submitCallback, cancelCallback })
    // 将虚拟节点渲染在容器中 => render(虚拟节点, DOM容器)
    render(vnode, div)
  })
}
