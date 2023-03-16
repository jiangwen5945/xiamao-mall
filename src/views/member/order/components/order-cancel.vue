<template>
    <j-dialog
      v-model="dialogVisible"
      title="取消订单"
      width="32%"
      lock
    >
      <!-- 组件内容 -->
      <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <ul>
          <li
            @click="curText = item"
            v-for="item in cancelReason"
            :key="item"
            :class="{ active: curText === item }"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 按钮操作 -->
      <template #footer>
        <div class="cancel-btn">
          <j-button type="plain" @click="dialogVisible=false">再想想</j-button>
          <j-button type="primary" @click="submit">确认</j-button>
        </div>
      </template>
  </j-dialog>
</template>
<script>
import { ref, getCurrentInstance } from 'vue'
import { cancelReason } from '@/api/constants'
export default {
  name: 'OrderCancel',
  setup (props, { emit }) {
    const { proxy } = getCurrentInstance()
    const dialogVisible = ref(false)
    const order = ref(null)
    const curText = ref('') // 选中的取消原因
    // 打开取消原因模态框
    const open = (item) => {
      dialogVisible.value = true
      order.value = item // 记录订单ID
      curText.value = '' // 清除之前选中原因
    }
    // 确认函数
    const submit = () => {
      // 提示没有勾选原因
      if (!curText.value) return proxy.$message({ message: '请选择取消订单的原因', type: 'warn' })
      // 1. 根据订单ID和取消原因发请求
      proxy.$api.cancelOrder({ id: order.value.id, curText: curText.value }).then(() => {
        proxy.$message({ message: '取消订单成功', type: 'success' })
        // 更新订单状态
        order.value.orderState = 6
        dialogVisible.value = false
      })
    }
    return { open, submit, cancelReason, curText, dialogVisible }
  }
}
</script>
<style scoped lang="less">
.cancel-info {
  padding:0 20px;
  text-align: center;
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  ul {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      display: inline-block;
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-bottom: 20px;
      color: #666;
      cursor: pointer;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: @themeColor;
      }
    }
  }
}
.cancel-btn{
  display: flex;
  justify-content: center;
}
</style>
