<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{logistics.list[0].time}}</span>
      <span>{{logistics.list[0].text}}</span>
    </p>
    <a href="javascript:;" @click="onLogisticsOrder(order)">查看物流</a>
    <!-- 查看物流组件 -->
    <OrderLogistics ref="logisticsOrderCom" />
  </div>
</template>
<script>
import { ref, getCurrentInstance } from 'vue'
import { useLogisticsOrder } from '../index'
import OrderLogistics from './order-logistics.vue'
export default {
  name: 'DetailLogistics',
  components: { OrderLogistics },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  async setup (props) {
    const { proxy } = getCurrentInstance()
    const logistics = ref(null)
    // 模拟加载时间
    const $sleep = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
    await $sleep()
    const res = await proxy.$api.logisticsOrder(props.order.id)
    logistics.value = res
    return { logistics, ...useLogisticsOrder() }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @themeColor;
    text-align: center;
  }
}
</style>
