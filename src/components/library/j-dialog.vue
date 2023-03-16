<template>
  <Teleport to="#dialog">
    <div class="overlay" v-if="modelValue" @click.self="handleHide">
      <div class="j-dialog" :style="[{width}]">
        <div class="j-dialog__header">
          <span class="j-dialog__title">
            <slot name="header"> {{title}} </slot>
          </span>
          <span @click="handleHide">
            <j-icon iconClass="close" size="20px" class="j-dialog__headerbtn"></j-icon>
          </span>
        </div>
        <div class="j-dialog__body">
          <slot />
        </div>
        <div class="j-dialog__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { watch } from 'vue'
export default {
  name: 'JDialog',
  props: {
    lock: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    title: {
      type: String,
      default: 'title'
    }
  },
  setup (props, { emit }) {
    // 使用侦听器，设置是否禁止遮罩层外部页面滚动
    watch(() => props.modelValue, () => {
      if (props.lock && props.modelValue) {
        scrollFn.stopScroll()
      } else {
        scrollFn.resetScroll()
      }
    })
    // 隐藏遮罩
    const handleHide = () => {
      emit('update:modelValue', false)
    }
    return { handleHide }
  }
}

const scrollFn = {
  stopSite: 0,
  // 禁止滚动
  stopScroll () {
    // 设置弹窗前滚动的位置
    this.stopSite = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = '-' + this.stopSite + 'px'
    document.body.style.width = 'calc(100% - 6px)'
  },
  // 恢复滚动
  resetScroll () {
    document.body.style.position = 'static'
    window.scrollTo(0, this.stopSite)
    document.body.style.width = '100%'
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
  background: rgba(0, 0, 0, .5);
  overflow: auto;
  opacity: 1;
}
.j-dialog {
  animation: dialog-open .3s linear;
  position: relative;
  margin: 15vh auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  width: 50%;
  opacity: 1;
  .j-dialog__header {
    padding: 20px;
    padding-bottom: 10px;
    margin-right: 16px;
    .j-dialog__title {
      line-height:24px;
      font-size: 18px;
      color: #000;
    }
    .j-dialog__headerbtn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 6px;
      right: 0;
      padding: 0;
      width: 54px;
      height: 54px;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 16px;
    }
  }

  .j-dialog__body {
    padding: 30px 20px;
    font-size: 14px;
  }

  .j-dialog__footer {
    padding: 20px;
    padding-top: 10px;
    text-align: right;
    box-sizing: border-box;
  }
}
@keyframes dialog-open
{
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
</style>
