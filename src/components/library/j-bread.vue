<script>
import { h } from 'vue'
import JIcon from './j-icon.vue'
export default {
  name: 'JBread',
  render () {
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h(JIcon, { iconClass: 'arrow-right', color: '#666' }))
      }
    })
    return h('div', { class: 'j-bread' }, dymanicItems)
  }
}
</script>
<!-- 去掉scoped全局作用 -->
<style lang='less'>
.j-bread{
  display: flex;
  padding: 25px 10px;
  align-items: center;
  &-item {
    color: #333;
    a {
      transition: all .4s;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
</style>
