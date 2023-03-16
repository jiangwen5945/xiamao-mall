// 插件: 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器
// import jSkeleton from './j-skeleton.vue'
// import jMore from './j-more.vue'
// import JBreadItem from './j-bread-item.vue'
// import JIcon from './j-icon.vue'
import Confirm from './Confirm.js'
import Message from './Message.js' // 引入重写的resetMessage.js文件
import Loading from './Loading.js' // 引入重写的resetMessage.js文件

const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(jSkeleton.name, jSkeleton)
    // app.component(jMore.name, jMore)
    // app.component(JBreadItem.name, JBreadItem)
    // app.component(JIcon.name, JIcon)

    // 根据keys批量注册
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      // 注册组件
      app.component(component.name, component)
    })

    // 定义指令
    // defineDirective(app)

    // 定义原型函数
    app.config.globalProperties.$message = Message
    app.config.globalProperties.$confirm = Confirm
    app.config.globalProperties.$loading = Loading
  }
}
