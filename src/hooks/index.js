// hooks 封装逻辑，提供响应式数据
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

/**
* 数据懒加载函数
* apiFn: 请求数据接口
* childrenNode: 返回数据中的字段节点（不传默认全部字段）
*/
export const useLazyData = (apiFn, childrenNode) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then(data => {
          result.value = data[childrenNode] || data
          console.log('数据懒加载函数调用API获取数据', result.value)
        })
      }
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}

/**
 * 支付倒计时
 */
export const countDownTimer = () => {
  // 倒计时逻辑
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(() => {
    time.value--
    if (time.value <= 0) {
      timeText.value = '已过期'
      pause()
    } else {
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    }
  }, 1000, false)
  // 页面卸载时暂停
  onUnmounted(() => {
    pause()
  })
  // 开启定时器倒计时方法
  const start = (countdown) => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }
  return {
    start,
    timeText
  }
}
