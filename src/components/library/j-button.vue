<template>
  <button class="j-button ellipsis" :class="[size,type]" :style="[disabledStyle,fullStyle]">
    <div class="icon" v-if="icon">
      <j-icon :iconClass="icon"></j-icon>
    </div>
    <slot />
  </button>
</template>
<script>
import JIcon from './j-icon.vue'
export default {
  name: 'JButton',
  components: {
    JIcon
  },
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    full: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const fullStyle = props.full ? { width: '100%' } : null
    const disabledStyle = props.disabled ? { cursor: 'not-allowed', background: '#eee' } : null
    return { disabledStyle, fullStyle }
  }
}
</script>
<style scoped lang="less">

.j-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 4px;
}
.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}
.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}
.small {
  width: 100px;
  height: 32px;
  font-size: 14px;
}
.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;
}
.default {
  border-color: #e4e4e4;
  color: #666;
  &:hover{
    border-color: @themeColor;
    color: @themeColor;
  }
}
.primary {
  border-color: @themeColor;
  background: @themeColor;
  color: #fff;
  &:hover{
    background: darken(@themeColor,2%);
  }
}
.plain {
  border-color: @themeColor;
  color: @themeColor;
    background: lighten(@themeColor,60%);;

  &:hover{
    background: lighten(@themeColor,50%);
  }
}
.info {
  background: #ccc;;
  color: #fff;
}
.link {
  border-color: transparent;
  color: #606266;
  background: 0 0;
  height: auto;
}
</style>
