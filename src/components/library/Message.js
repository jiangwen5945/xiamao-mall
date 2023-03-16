import { createVNode, render } from 'vue'
import JMessage from './j-message.vue'

const div = document.createElement('div')
div.setAttribute('class', 'j-message-container')
document.body.appendChild(div)

// 定时器标识
let timer = null
export default ({ type, message }) => {
  const vnode = createVNode(JMessage, { type, message })
  render(vnode, div)
  // 开启定时，移出DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
