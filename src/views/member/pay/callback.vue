<template>
  <div class="container">
    <JBread>
      <JBreadItem to="/">首页</JBreadItem>
      <JBreadItem to="/cart">购物车</JBreadItem>
      <JBreadItem>支付结果</JBreadItem>
    </JBread>
    <!-- 支付结果 -->
    <div class="pay-result"  v-if="order">
      <j-icon iconClass="success" size="70px"></j-icon>
      <p class="title">订单支付{{$route.query.payResult?'成功':'失败'}}</p>
      <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
      <p>支付方式：<span>微信支付</span></p>
      <p>支付金额：<span>¥{{order.payMoney}}</span></p>
      <div class="btn">
        <j-button type="primary" @click="$router.push('/member/order')"  :style="{width: '140px',height:'40px'}">查看订单</j-button>
        <j-button type="plain" @click="$router.push('/')"  :style="{width: '140px',height:'40px'}">返回首页</j-button>
      </div>
      <p class="alert">
        <j-icon iconClass="tishi" color='red' size="14px"></j-icon>
        <span>温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。</span>
      </p>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'PayResultPage',
  setup () {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const order = ref(null)
    proxy.$api.findOrder(route.query.orderId).then(res => {
      order.value = res
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .title {
    font-size: 24px;
    margin-top: 14px;
  }
  .tip {
    color: #999;
    font-size: 16px;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 4px;
    }
  }
}
</style>
