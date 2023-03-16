<template>
  <span class="j-icon">
    <span v-if="$slots.before" class="icon-text" :style="{color:color, fontSize: fontSize}" >
      <slot name="before"/>
    </span>
    <svg class="svg-icon" aria-hidden="true" :class="[{animation}]" :style="{color:color,width:size,height:size,cursor:pointer?'pointer':'default'}" >
      <use :xlink:href="iconName"></use>
    </svg>
    <span v-if="$slots.default" class="icon-text" :style="{color:color, fontSize: fontSize}" >
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  name: 'JIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    color: { // 字体颜色
      type: [String, Object],
      default: '#999'
    },
    size: {
      type: String,
      default: '20px'
    },
    pointer: { // 默认不开启鼠标手状
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    animation: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style lang="less" scoped>
.svg-icon {
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
.animation {
  animation: rotate 3s linear infinite;
}
@keyframes rotate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.j-icon{
  display: inline-flex;
  align-items: center;
  .icon-text{
    margin-left: 4px;
  }
}

</style>
