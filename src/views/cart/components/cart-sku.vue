<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{attrsText}}</span>
      <j-icon iconClass="down"/>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading" v-if="!goods"></div>
      <div v-else>
        <!-- 商品信息sku组件 -->
        <GoodsSku :skuId="skuId" :goods="goods" @change="changeSku"></GoodsSku>
        <div class="btn-box">
          <j-button type="primary" size="mini" @click="submit()">确认</j-button>
          <j-button  size="mini" @click="toggle()">取消</j-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, getCurrentInstance } from 'vue'
import { onClickOutside } from '@vueuse/core'
import GoodsSku from '@/views/product/components/GoodsSku.vue'
export default {
  name: 'CartSku',
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  components: {
    GoodsSku
  },
  setup (props, { emit }) {
    const { proxy } = getCurrentInstance()
    const visible = ref(false)
    const goods = ref(null)
    const currSku = ref(null)
    const show = () => {
      visible.value = true
      proxy.$api.getSpecsAndSkus(props.skuId).then(res => {
        goods.value = res
        console.log('getCurrentInstance', res)
      })
    }
    const hide = () => {
      visible.value = false
      goods.value = null
    }
    const toggle = () => {
      visible.value ? hide() : show()
    }
    const target = ref(null)
    onClickOutside(target, () => {
      hide()
    })
    const changeSku = (sku) => {
      console.log('changeSku', sku)
      currSku.value = sku
    }
    // 点击确认的时候，提交sku信息给购物车组件
    const submit = () => {
      // 给购物车组件数据的前提：有sku信息，sku信息完整，sku中的skuId不能现有props.skuId一样
      if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value)
      }
      hide()
    }
    return { visible, toggle, target, goods, changeSku, submit }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    align-items: center;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @themeColor;
    box-shadow: 2px 2px 4px lighten(@themeColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @themeColor;
      border-top: 1px solid @themeColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
    .btn-box {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
