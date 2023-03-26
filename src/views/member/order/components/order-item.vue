<template>
    <div class="order-item">
      <div class="head">
        <span>下单时间：{{order.createTime}}</span>
        <span>订单编号：{{order.id}}</span>
        <!-- 未付款，倒计时 -->
        <span class="down-time" v-if="order.orderState===1">
          <j-icon iconClass="Field-time"/>
          <span>{{ timeText }}</span>
        </span>
        <!-- 已完成 已取消 -->
        <span class="delete" v-if="[5,6].includes(order.orderState)" @click="deleteOrder(order)">删除</span>
      </div>
      <div class="body">
        <div class="column goods">
          <ul>
            <li v-for="goods in order.skus" :key="goods.id">
              <a class="image" href="javascript:;">
                <img :src="goods.image" alt="" />
              </a>
              <div class="info">
                <p class="name ellipsis-2">{{goods.name}}</p>
                <p class="attr ellipsis">{{goods.attrsText}}</p>
              </div>
              <div class="price">¥{{goods.realPay}}</div>
              <div class="count">x{{goods.quantity}}</div>
            </li>
          </ul>
        </div>
        <div class="column state">
          <p>{{orderStatus[order.orderState].label}}</p>
          <!-- 待收货：查看物流 -->
          <!-- 待评价：评价商品 -->
          <!-- 已完成：查看评价 -->
          <p v-if="order.orderState===3"><a href="javascript:;" class="green" @click="$emit('onLogisticsOrder')">查看物流</a></p>
          <p v-if="order.orderState===4"><a href="javascript:;" class="green">评价商品</a></p>
          <p v-if="order.orderState===5"><a href="javascript:;" class="green">查看评价</a></p>
        </div>
        <div class="column amount">
          <p class="red">¥{{order.payMoney}}</p>
          <p>（含运费：¥{{order.postFee}}）</p>
          <p>在线支付</p>
        </div>
        <div class="column action">
          <!-- 待支付：立即付款，查看详情，取消订单 -->
          <!-- 待发货：查看详情，再次购买 -->
          <!-- 待收货：确认收货，查看详情，再次购买 -->
          <!-- 待评价：查看详情，再次购买，申请售后 -->
          <!-- 已完成：查看详情，再次购买，申请售后 -->
          <!-- 已取消：查看详情 -->
          <j-button v-if="order.orderState===1" :type="payButtonType"  size="small" :disabled="isDisabledPay">立即付款</j-button>
          <j-button v-if="order.orderState===3" type="primary" size="small" @click="$emit('onConfirmOrder',order)">确认收货</j-button>
          <p><j-button type='link'  size="small" @click="$router.push(`/member/order/${order.id}`)">查看详情</j-button></p>
          <p v-if="order.orderState===1">
            <j-button type='link'  size="small" @click = "$emit('onCancelOrder', order)">取消订单</j-button>
          </p>
          <p v-if="[2,3,4,5].includes(order.orderState)">
            <j-button type='link'  size="small" @click="$router.push(`/member/checkout?orderId=${order.id}`)">再次购买</j-button>
          </p>
          <p v-if="[4,5].includes(order.orderState)">
            <j-button type='link'  size="small">申请售后</j-button>
          </p>
        </div>
      </div>
    </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import { countDownTimer } from '@/hooks'
import { ref, watch } from 'vue'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
export default {
  name: 'OrderItem',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['onCancelOrder', 'onDeleteOrder', 'onConfirmOrder', 'onLogisticsOrder'],
  setup (props, { emit }) {
    const isDisabledPay = ref(false)
    const payButtonType = ref('primary')
    const { start, timeText } = countDownTimer()
    start(props.order.countdown) // 开启倒计时

    // 观察订单超时状态
    watch(timeText, () => {
      if (timeText.value === '已过期') {
        // 设置支付按钮不可用
        isDisabledPay.value = true
        payButtonType.value = 'info'
        // 更新订单为失效状态
        // emit('updateOrderState', props.order)
      }
    }, { immediate: true })

    // 删除订单
    const deleteOrder = (order) => {
      Confirm({ text: '您确定删除该订单吗？' }).then(() => {
        emit('onDeleteOrder', order)
        Message({ type: 'success', message: '删除成功' })
      }).catch(e => e)
    }
    return { orderStatus, isDisabledPay, payButtonType, timeText, deleteOrder }
  }
}
</script>
<style scoped lang="less">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    .down-time {
      display: flex;
      align-items: center;
      margin-right: 20px;
      float: right;
    }
    .delete {
      margin-right: 0;
      float: right;
      color: #999;
      cursor: pointer;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @themeColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @themeColor;
          }
        }
      }
    }
  }
}
</style>
