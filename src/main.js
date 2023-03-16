import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 数据接口
import 'normalize.css' // Normalize初始化样式
import './assets/styles/common.less' // 通用样式
// import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入所有 Element Ui图标
import ui from './components/library' // 自定义插件
import './assets/icon/iconfont.js' // 自定义图标
const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   // 全局使用icon
//   app.component(key, component)
// }

app.config.globalProperties.$api = api
app.use(store).use(router).use(ui).mount('#app')
