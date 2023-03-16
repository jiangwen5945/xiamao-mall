<template>
  <!-- 订单状态取消时候返回1，否则返回订单状态码 -->
  <JSteps :active="order.orderState===6?1:order.orderState">
    <JStepsItem title="提交订单" :desc="order.createTime" />
    <JStepsItem title="付款成功" :desc="order.payTime" />
    <JStepsItem title="商品发货" :desc="order.consignTime" />
    <JStepsItem title="确认收货" :desc="order.evaluationTime" />
    <JStepsItem title="订单完成" :desc="order.endTime" />
  </JSteps>
</template>

<script>
export default {
  name: 'DetailSteps',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
