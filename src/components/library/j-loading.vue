<template>
  <Teleport to="#dialog">
    <div class="overlay" @touchmove.prevent v-if="modelValue">
      <div class="j-loading">
        <svg viewBox="25 25 50 50" class="svg">
          <circle cx="50" cy="50" r="20" fill="none" class="circle"></circle>
        </svg>
        <p class="loading-text">{{ loadingText }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'JLoading',
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    },
    lock: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    // 使用侦听器，设置是否禁止遮罩层外部页面滚动
    // console.log(props.lock && props.modelValue)
    // watch(() => props.modelValue, () => {
    //   if (props.lock && props.modelValue) {
    //     scrollFn.stopScroll()
    //   } else {
    //     scrollFn.resetScroll()
    //   }
    // }, { immediate: true })
  }
}
</script>

<style lang="less" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  overflow: auto;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  .j-loading{
    .loading-text{
      color: @themeColor;
      text-align: center;
    }
  }
  .svg {
    animation: rotate 2s linear infinite;
    height: 60px;
    width: 60px;
    .circle {
      animation: circle 2s infinite;
      stroke-dasharray: 120 125;
      stroke-dashoffset: -125px;
      stroke-width: 2;
      stroke: @themeColor;
      stroke-linecap: round;
    }
  }
}

@keyframes rotate {
  to {
    transform: rotate(1turn)
  }
}

/* 弧线动画 */
@keyframes circle {
  0% {
    stroke-dasharray: 1 125;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 120, 125;
    stroke-dashoffset: 0;
  }

  to {
    stroke-dasharray: 120 125;
    stroke-dashoffset: -125px;
  }
}

</style>
