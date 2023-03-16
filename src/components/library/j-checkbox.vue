<template>
  <div class="j-checkbox">
    <span class="icon-wrap" @click="changeChecked()"  :style="{color: (checked? activeColor: color)}">
      <j-icon :icon-class="checked?'checked':'unchecked'" color/>
      <span class="label"> {{ label }} </span>
    </span>
    <slot/>
  </div>
</template>
<script>
import { ref, watch } from 'vue' // v-model  ====>  :modelValue  +   @update:modelValue
// import { useVModel } from '@vueuse/core'
export default {
  name: 'JCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#999'
    },
    activeColor: {
      type: String,
      default: '#27ba9b'
    },
    label: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value) // 使用emit通知父组件数据的改变
      emit('change', checked.value) // 使用emit通知父组件数据的改变
    }
    // 使用侦听器，得到父组件传递数据，给checked数据
    watch(() => props.modelValue, () => {
      checked.value = props.modelValue
    }, { immediate: true })

    // 方法2：使用插件@vueuse/core 的实现
    // const checked = useVModel(props, 'modelValue', emit)
    // const changeChecked = () => {
    //   const newVal = !checked.value
    //   // 通知父组件
    //   checked.value = newVal
    //   // 让组件支持change事件
    //   emit('change', newVal)
    // }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.j-checkbox {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  .icon-wrap{
    display: flex;
    align-items: center;
    .label {
      display: inline-block;
      padding-left: 6px;
      color: #606266;
    }
  }
}
</style>
