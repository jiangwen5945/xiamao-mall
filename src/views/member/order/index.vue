<template>
  <div class="member-order">
    <JTabs v-model="activeName" @click-tab="handleTabState">
      <JTabPanel
        :name="item.name"
        :label="item.label"
        v-for="item in orderStatus"
        :key="item.id"
      >
        <OrderItem
          :order = "item"
          v-for="(item, index) in orders.orderList"
          :key="index"
          @onCancelOrder = 'onCancelOrder(item)'
          @onDeleteOrder = 'onDeleteOrder'
          @onConfirmOrder="onConfirmOrder(item)"
          @onLogisticsOrder = "onLogisticsOrder(item)"
        />
      </JTabPanel>
      <!-- 分页 -->
      <template v-slot:pagination>
        <j-pagination
          :total="orders.counts"
          @changePage="onChangePage"
          :pageSize ="requestParams.pageSize"
          :currentPage="requestParams.page"
        />
      </template>
    </JTabs>

    <!-- 取消订单组件弹层 -->
    <Teleport to="#dialog">
      <OrderCancel ref="cancelOrderCom" />
    </Teleport>

    <!-- 查看物流组件弹层 -->
    <Teleport to="#dialog">
      <OrderLogistics ref="logisticsOrderCom" ></OrderLogistics>
    </Teleport>
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import { ref, reactive, getCurrentInstance, watch } from 'vue'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel'
import OrderLogistics from './components/order-logistics' // 订单物流组件
// import { ElLoading } from 'element-plus'
import Message from '@/components/library/Message'
import Confirm from '@/components/library/Confirm'
import Loading from '@/components/library/Loading'
import Api from '@/api'
export default {
  name: 'MemberOrder',
  components: {
    OrderItem,
    OrderCancel,
    OrderLogistics
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const activeName = ref('all') // 当前激活菜单名称
    const orders = ref([])
    const requestParams = reactive({
      orderState: 0,
      page: 1,
      pageSize: 10
    })

    // 请求订单列表方法
    const getOrderList = () => {
      Loading.open({ modelValue: true })
      proxy.$api.findOrderList(requestParams).then(res => {
        orders.value = res
        // 关闭加载
        setTimeout(Loading.close, 500)
      })
    }

    // 菜单切换事件
    const handleTabState = (stateIndex) => {
      requestParams.orderState = stateIndex.index
      requestParams.page = 1
    }

    // 监听请求参数变化
    watch(requestParams, () => {
      getOrderList()
    }, { immediate: true })

    // 删除订单
    const onDeleteOrder = (order) => {
      proxy.$api.delteOrder({ id: order.id }).then(res => {
        Message({ message: '删除订单成功', type: 'success' })
        getOrderList() // 重新请求列表数据
      })
    }

    // 分页切换
    const onChangePage = (currentPage) => {
      requestParams.page = currentPage
    }
    return { activeName, handleTabState, orderStatus, orders, onChangePage, ...useCancelOrder(getOrderList), onDeleteOrder, ...useConfirmOrder(), ...useLogisticsOrder(), requestParams }
  }
}

// *********  封装逻辑 **********
// const { proxy } = getCurrentInstance()

// 封装逻辑-确认收货
export const useConfirmOrder = (ctxFn) => {
  const onConfirmOrder = (order) => {
    Confirm({ text: '您确定收货吗？确认后货款将打给商家。' }).then(() => {
      Api.confirmOrder({ id: order.id }).then(() => {
        Message({ message: '确认收货成功', type: 'success' })
        order.orderState = 4 // 待收货 => 待评价
      })
    }).catch()
  }
  return { onConfirmOrder }
}
// 封装逻辑-查看物流(导出方法可供其他组件使用)
export const useLogisticsOrder = (item) => {
  const logisticsOrderCom = ref(null)
  const onLogisticsOrder = (item) => {
    logisticsOrderCom.value.open(item)
  }
  return { onLogisticsOrder, logisticsOrderCom }
}
// 封装逻辑-取消订单
export const useCancelOrder = (callback) => {
  const cancelOrderCom = ref(null)
  const onCancelOrder = (order) => {
    cancelOrderCom.value.open(order)
    // 执行提交后的回调方法（可选）
    if (callback) callback()
  }
  return { onCancelOrder, cancelOrderCom }
}
</script>
