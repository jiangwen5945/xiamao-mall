<script>
import { h } from 'vue'
export default {
  name: 'JBread',
  render () {
    const items = this.$slots.default()
    const dymanicItems = []
    const icon = <j-icon iconClass='arrow-right' color='#666'/>
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h(icon))
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
