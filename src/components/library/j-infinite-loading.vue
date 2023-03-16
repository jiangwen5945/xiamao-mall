<template>
  <div class="j-infinite-loading" ref="target">
    <div class="loading"  v-if="loading">
      <j-icon iconClass="loading" animation>加载中·····</j-icon>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'JInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const target = ref(null)
    console.log('1.初始化无限加载组件')
    // 监听target是否进入可视区
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        console.log('2.监听target是否进入可视区')
        if (isIntersecting) {
          console.log('3:进入可视区了')
          if (props.loading === false && props.finished === false) {
            console.log('4:加载数据中...')
            emit('infinite')
          }
        }
      },
      {
        threshold: 0 // 起始点
      }
    )
    return { target }
  }
}
</script>

<style scoped lang='less'>
.j-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
