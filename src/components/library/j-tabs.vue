<script>
import { provide, ref } from 'vue'
export default {
  name: 'JTabs',
  render () {
    // 获取插槽内容
    const panels = this.$slots.default()
    const pagination = <div class='pagination-container'>{this.$slots.pagination()}</div>
    // 动态插槽内容
    const dynamicPanels = []
    panels.forEach(item => {
      if (item.type.name === 'JTabPanel') {
        dynamicPanels.push(item)
      } else {
        item.children.forEach(co => {
          dynamicPanels.push(co)
        })
      }
    })
    // 选项卡导航菜单结构内容(动态生成的tabs-panel无法正常运行)
    const nav = <nav>
      {
        dynamicPanels.map((e, i) => {
          return <span
            onClick={() => this.tabClick(e.props.name, i)}
            class={{ active: e.props.name === this.activeName }}
          >
            {e.props.label}
          </span>
        })
      }
    </nav>
    return <div class="j-tabs">{[nav, panels, pagination]}</div>
  },
  setup (props, { emit }) {
    const activeName = ref('all')
    // 依赖注入传值
    provide('activeName', activeName)
    // 点击选项卡对应的处理函数
    const tabClick = (name, index) => {
      activeName.value = name
      // 触发一个点击自定义事件
      emit('clickTab', { name, index })
    }
    return { activeName, tabClick }
  }
}
</script>

<style lang="less" scoped>
.j-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > span {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      &.active {
        border-top: 2px solid @themeColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
  }
}
</style>
