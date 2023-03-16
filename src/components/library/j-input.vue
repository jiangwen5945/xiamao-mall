<template>
  <div class="j-input">

    <!-- 前置插槽 -->
    <div class="j-input__append" v-if="$slots.prepend">
      <slot name="prepend"/>
    </div>

    <!-- 输入框 -->
    <div class="j-input__wrapper" :class="{'is-focus': isFocus}">
      <!-- 前置图标 -->
      <span class="j-input__prefix" v-if="$props.prefixIcon">
        <span class="j-input__prefix-inner">
         <j-icon :iconClass="prefixIcon"/>
        </span>
      </span>
      <!-- 内容 -->
       <!-- @change="(e)=>$emit('update:modelValue', e.target.value)" -->
      <input
        @blur="onBlur"
        @focus="()=>isFocus = true"
        @input="onInput"
        class="j-input__inner"
        :type="type"
        autocomplete="off"
        tabindex="0"
        :placeholder="placeholder"
        :value="modelValue"
      >
      <!-- 后置图标 -->
      <span class="j-input__suffix" v-if="$props.suffixIcon">
        <span class="j-input__suffix-inner">
          <j-icon :iconClass="suffixIcon"/>
        </span>
      </span>
    </div>
    <!-- 后置插槽 -->
    <div class="j-input__append" v-if="$slots.append">
      <slot name="append"/>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'JInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    modelModifiers: { default: {} }
  },
  setup (props, { emit }) {
    const isFocus = ref(false)
    const lazyStatusStop = ref(true) // 默认不开启lazy
    watch(() => props.modelModifiers, () => {
      if (props.modelModifiers.lazy) {
        lazyStatusStop.value = false // 使用lazy修饰符时，开启lazy
      }
    })
    const onBlur = () => {
      isFocus.value = false
      lazyStatusStop.value = true // 关闭lazy
    }
    const onInput = (e) => {
      if (lazyStatusStop.value) {
        emit('update:modelValue', e.target.value)
      }
    }

    return { isFocus, onBlur, onInput }
  }
}
</script>

<style lang="less" scoped>
.j-input {
  display: inline-flex;
  position: relative;
  font-size: 14px;
  width: 100%;
  line-height: 32px;
  box-sizing: border-box;
  vertical-align: middle;
  &.error{
    .j-input__wrapper {
      transition: box-shadow .2s linear;
      box-shadow: 0 0 0 1px #f56c inset;
      &.is-focus {
        box-shadow: 0 0 0 1px #f56c inset;
      }
    }
  }
  &__wrapper {
    height: 46px;
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    padding: 1px 11px;
    background-color: #fff;
    transition: box-shadow .2s linear;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    &.is-focus {
      box-shadow: 0 0 0 1px @themeColor inset;
    }
  }
  &__inner {
    width: 100%;
    flex-grow: 1;
    color: #606266;
    height: 30px;
    line-height: 30px;
    padding: 0 6px;
    outline: none;
    border: none;
    background: none;
    box-sizing: border-box;
    // 支持火狐
    &:autofill {
      background: #fff;
    }
    // 支持chrome
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s;
      -webkit-text-fill-color: #606266;
    }
  }
  &__prefix, &__suffix {
    display: inline-flex;
    white-space: nowrap;
    flex-shrink: 0;
    flex-wrap: nowrap;
    height: 100%;
    text-align: center;
    color: #a8abb2;
    transition: all 0.3s;
    pointer-events: none;
    &-inner {
      pointer-events: all;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__append, &__prepend {
    background-color: #f5f7fa;
    color: #909399;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    // border-radius: 4px;
    padding: 0 20px;
    white-space: nowrap;

    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: 0 1px 0 0 #dcdfe6 inset, 0 -1px 0 0 #dcdfe6 inset, -1px 0 0 0 #dcdfe6 inset;
  }
}

</style>
