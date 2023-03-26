<template>
  <j-input class="j-code" v-model="code" placeholder="请输入验证码" prefix-icon="message">
    <template #append>
      <div @click="sendCode" class="code-btn" :class="[isActive&&time===0 ? 'isActived': 'unActived']"> {{time===0?'发送验证码':`${time}秒后发送`}}</div>
    </template>
  </j-input>
</template>

<script>
import { useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import Message from '@/components/library/Message'
export default {
  name: 'JCode',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 验证码倒计时
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)

    // 发送短信
    const sendCode = async () => {
      // 没有倒计时且按钮激活时才可以发送
      if (props.isActive) {
        try {
          if (time.value === 0) {
          // await proxy.$api.sendMsgCode(MsgForm)
            Message({ message: '发送成功', type: 'success' })
            time.value = 60
            resume()
          } else {
            Message({ message: `请等待${time.value}秒后重试`, type: 'warn' })
          }
        } catch (error) {
          Message({ message: error, type: 'error' })
        }
      }
    }

    const code = ref(props.modelValue)

    // 页面卸载时
    onUnmounted(() => {
      pause()
    })
    return { sendCode, time, code }
  }
}
</script>

<style scoped lang='less'>
  .isActived{
    color: @themeColor;
  }
  .unActived{
    color: #999;
    cursor: not-allowed;
  }
</style>
