import { createVNode, render } from 'vue'
import JLoading from './j-loading.vue'

// 准备DOM容器
const div = document.createElement('div')
div.setAttribute('class', 'j-loading-container')
document.body.appendChild(div)

// export default ({ modelValue }) => {
//   // 创建虚拟节点
//   const vnode = createVNode(JLoading, { modelValue })
//   // 渲染节点
//   render(vnode, div)
// }
const scrollFn = {
  stopSite: 0,
  // 禁止滚动
  stopScroll () {
    // 设置弹窗前滚动的位置
    this.stopSite = window.scrollY
    console.log('开启锁定滚动', this.stopSite)
    document.body.style.position = 'fixed'
    document.body.style.top = '-' + this.stopSite + 'px'
    document.body.style.width = 'calc(100% - 6px)'
  },
  // 恢复滚动
  resetScroll () {
    console.log('恢复滚动', this.stopSite)
    document.body.style.position = 'static'
    window.scrollTo(0, this.stopSite)
    document.body.style.width = '100%'
  }
}
export default {
  close: () => {
    scrollFn.resetScroll()
    // 销毁组件
    render(null, div)
  },
  open: (params) => {
    scrollFn.stopScroll()
    // 创建虚拟节点
    const vnode = createVNode(JLoading, params)
    // 渲染节点
    render(vnode, div)
  }
}
