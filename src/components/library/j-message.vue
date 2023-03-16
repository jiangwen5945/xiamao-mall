<template>
  <Transition name="down">
    <div class="j-message" :style="style[type]" v-show="visible">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <j-icon :iconClass="style[type].icon"></j-icon>
      <span class="text">{{message}}</span>
    </div>
  </Transition>
</template>
<script>
import { onMounted, ref } from 'vue'
import JIcon from './j-icon.vue'
export default {
  name: 'JMessage',
  components: {
    JIcon
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'warn'
    }
  },
  setup () {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warn: {
        icon: 'warn',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'error',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'success',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    // 定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
    const visible = ref(false)
    onMounted(() => {
      visible.value = true
    })
    return { style, visible }
  }
}
</script>
<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translate(0,-75px);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.j-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -100px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  .text {
    margin-left: 6px;
  }
}
</style>
