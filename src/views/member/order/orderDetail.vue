<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 -->
    <DetailSteps :order="order"/>
    <!-- 物流栏(异步组件) -->
    <Suspense  v-if="[3,4,5].includes(order.orderState)">
      <!-- 组件加载完毕 -->
      <template #default>
        <DetailLogistics :order="order" />
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
    <OrderInfo :order="order"/>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action'
import DetailSteps from './components/detail-steps'
import DetailLogistics from './components/detail-logistics'
import OrderInfo from './components/order-info.vue'
export default {
  name: 'OrderDetail',
  components: {
    DetailAction,
    DetailSteps,
    DetailLogistics,
    OrderInfo
  },
  setup () {
    const order = ref(null)
    const route = useRoute()
    const { proxy } = getCurrentInstance()
    proxy.$api.findOrder(route.params.id).then(res => {
      order.value = res
    })
    return { order }
  }
}
</script>

<style lang="less" scoped>
.order-detail-page{
  background: #fff;
  height: 100%;
}
.loading {
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  background-color: #f5f5f5;
  color: #999;
  margin: 30px 50px 0;
  text-align: center;
}
</style>
