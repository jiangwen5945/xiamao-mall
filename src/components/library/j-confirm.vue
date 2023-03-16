<template>
  <div class="j-confirm" :class="{fade}">
    <div class="wrapper" :class="{fade}">
      <div class="header">
        <h3>{{title}}</h3>
        <a @click="cancelCallback()"  href="JavaScript:;">×</a>
      </div>
      <div class="body">
        <j-icon iconClass="warn"></j-icon>
        <span class="text">{{ text }}</span>
      </div>
      <div class="footer">
        <j-button type="info" size="mini" @click="cancelCallback()">取消</j-button>
        <j-button type="primary" size="mini" @click="submitCallback()">确认</j-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import JIcon from './j-icon.vue'
import JButton from './j-button.vue'
export default {
  name: 'JConfirm',
  components: {
    JIcon,
    JButton
  },
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    text: {
      type: String,
      default: ''
    },
    submitCallback: {
      type: Function
    },
    cancelCallback: {
      type: Function
    }
  },
  setup () {
    const fade = ref(false)
    onMounted(() => {
      // 当元素渲染完毕立即过渡的动画不会触发
      setTimeout(() => {
        fade.value = true
      }, 0)
    })
    return { fade }
  }
}
</script>
<style scoped lang="less">
.j-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0,0,0,0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0,0,0,.5);
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%,-50%);
      opacity: 1;
    }
    .header,.footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .text{
        margin-left: 8px;
      }
    }
    .footer {
      text-align: right;
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
