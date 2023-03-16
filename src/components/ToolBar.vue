<template>
  <div class="tool-bar">
      <router-link :to="item.path" class="item" v-for="item in tools" :key="item.name">
        <j-icon :iconClass="item.icon" size="30"/>
        <span>{{ item.name }}</span>

      </router-link>
      <a class="item" v-show="!isHideBack" @click="backTop">
        <j-icon iconClass="arrow-up" size="34"/>
        <span>返回顶部</span>
      </a>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ToolBar',
  props: {
    tools: {
      type: Array,
      default: () => [
        { path: '/member', name: '个人中心', icon: 'member' },
        { path: '/', name: '售后服务', icon: 'shouhou' },
        { path: '/', name: '人工客服', icon: 'kefu' },
        { path: '/cart', name: '购物车', icon: 'gouwuche' }
      ]
    }
  },
  setup () {
    const scrollTop = ref(0)
    const isHideBack = ref(true)
    window.onscroll = () => {
      scrollTop.value = document.documentElement.scrollTop
      isHideBack.value = scrollTop.value < 500
    }
    const backTop = () => {
      const scrollTopTimer = setInterval(() => {
        const top = document.body.scrollTop || document.documentElement.scrollTop
        const speed = top / 10
        document.documentElement.scrollTop -= speed
        if (top === 0) {
          clearInterval(scrollTopTimer)
        }
      }, 30)
    }
    return {
      isHideBack,
      backTop
    }
  }
}
</script>

<style lang="less" scoped>
.tool-bar {
  position: fixed;
  bottom: 150px;
  left: calc(@baseWidth + 570px);
  z-index: 99;

  .item {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 84px;
    height: 92px;
    background-color: #fff;
    border: 1px solid #f5f5f5;
    color: #999;
    opacity: 1;
    cursor:pointer;
    span{
      margin-top: 4px;
    }
    &:last-child {
      margin-top: 8px;
      transition: all 0.4s;
    }
    &:hover {
      color: lighten(#999, 15%);
    }
  }
}
</style>
