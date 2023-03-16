<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <j-icon :iconClass="`${orderStatus[order.orderState].name}`" size="46px" color="#1f957c"/>
      <p>{{orderStatus[order.orderState].label}}</p>
    </div>
    <div class="info">
      <p>订单编号：{{order.id}}</p>
      <p>下单时间：{{order.createTime}}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <j-button type="primary" size="small" @click="$router.push('/member/pay?id='+order.id)" >立即付款</j-button>
        <j-button size="small" @click ="onCancelOrder(order)" type="plain">取消订单</j-button>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <j-button type="primary" size="small" @click="$router.push(`/member/checkout?orderId=${order.id}`)">再次购买</j-button>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <j-button  type="primary"  size="small" @click="onConfirmOrder(order)">确认收货</j-button>
        <j-button  type="plain" size="small">再次购买</j-button>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <j-button type="primary"  size="small" @click="$router.push(`/member/checkout?orderId=${order.id}`)">再次购买</j-button>
        <j-button type="plain" size="small">评价商品</j-button>
        <j-button type="plain" size="small">申请售后</j-button>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <j-button type="primary"  size="small" @click="$router.push(`/member/checkout?orderId=${order.id}`)">再次购买</j-button>
        <j-button type="plain" size="small">查看评价</j-button>
        <j-button type="plain" size="small">申请售后</j-button>
      </template>
      <!-- 已取消 -->
    </div>
    <!-- 取消订单组件 -->
    <Teleport to="#dialog">
      <OrderCancel ref="cancelOrderCom"/>
    </Teleport>
  </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import OrderCancel from './order-cancel'
import { useCancelOrder, useConfirmOrder } from '../index'

export default {
  name: 'OrderDetailAction',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    OrderCancel
  },
  setup () {
    return { orderStatus, ...useCancelOrder(), ...useConfirmOrder() }
  }
}
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @themeColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
  }
}
</style>
