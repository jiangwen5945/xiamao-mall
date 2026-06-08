<script>
import { provide, ref, h } from 'vue'
export default {
  name: 'JTabs',
  render () {
    const panels = this.$slots.default()
    const pagination = this.$slots.pagination
      ? h('div', { class: 'pagination-container' }, this.$slots.pagination())
      : null
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
    const nav = h(
      'nav',
      dynamicPanels.map((e, i) => {
        return h('span', {
          class: { active: e.props.name === this.activeName },
          onClick: () => this.tabClick(e.props.name, i)
        }, e.props.label)
      })
    )
    return h('div', { class: 'j-tabs' }, [nav, panels, pagination].filter(Boolean))
  },
  setup (props, { emit }) {
    const activeName = ref('all')
    provide('activeName', activeName)
    const tabClick = (name, index) => {
      activeName.value = name
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
