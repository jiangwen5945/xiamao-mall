<template>
  <div class="shopping_car" @mouseenter="setSubMenuHide(false)" @mouseleave="setSubMenuHide(true)">
    <j-icon
      :iconClass="$store.getters['cart/validTotal'] === 0? 'gouwuche_null' : 'gouwuche_full'"
      color="#fff"
    >
      购物车（{{ $store.getters['cart/validTotal'] }}）
    </j-icon>
    <!--购物车下拉隐藏菜单-->
    <transition>
      <div class="menu" v-show="!isHideCartMenu">
        <!-- 购物车为空时 -->
        <j-empty description="购物车为空" image-size="150px"  v-if="$store.getters['cart/validTotal'] === 0"/>
        <!-- 购物车不为空时 -->
        <ul class="cart-list" v-else>
          <li class="cart-item" v-for="(item) in $store.getters['cart/validList']" :key="item">
            <img :src="item.picture" alt="">
            <div class="center">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="attr ellipsis">{{ item.desc }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{item.price}}</p>
              <p class="count">x{{ item.count || 1 }}</p>
            </div>
            <div class="close" @click="deleteCart(item.skuId)">
              <j-icon iconClass="close" />
            </div>
          </li>
        </ul>
        <div class="foot">
          <div class="total">
            <p>共 {{$store.getters['cart/validTotal'] }} 件商品</p>
            <p>&yen;{{$store.getters['cart/validAmount'] }}</p>
          </div>
          <j-button type="plain" @click="$router.push('/cart')">去购物车结算</j-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'HeaderCart',
  setup () {
    const { proxy } = getCurrentInstance()
    // 是否隐藏购物车下拉清单
    const isHideCartMenu = ref(true)
    // 隐藏购物车下拉清单
    const setSubMenuHide = (state) => {
      isHideCartMenu.value = state
    }
    const store = useStore()
    const list = store.state.cart.list
    store.dispatch('cart/findCartList')
    // 删除
    const deleteCart = (skuId) => {
      store.dispatch('cart/deleteCart', skuId).then(() => {
        proxy.$message({ message: '删除成功', type: 'success' })
      }).catch(e => {
        proxy.$message({ message: '删除失败', type: 'error' })
      })
    }
    return { isHideCartMenu, setSubMenuHide, list, deleteCart }
  }
}
</script>
<style scoped lang="less">
.shopping_car {
  display: flex;
  align-items: center;
  position: relative;
  color: #fff;
  background: @themeColor;
  margin-left:10px;
  padding: 0 10px;
  &:hover {
    background:lighten(@themeColor, 5%);
  }
  .menu {
    position: absolute;
    right: 0;
    top: 40px;
    z-index: 31;
    width: 380px;
    color: #424242;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    .cart-list {
      padding: 10px 10px 10px 20px;
      overflow:auto;
      max-height: 400px;
      .cart-item {
        padding: 4px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        overflow: hidden;
        &:hover{
          .close{
            visibility: inherit;
          }
        }
        img {
          width: 60px;
          height: 60px;
        }
        .center {
            padding: 0 10px;
            width: 200px;
          .name {
            font-size: 14px;
            color: #333;
          }
          .attr {
            color: #999;
            padding-top: 5px;
          }
        }
        .right {
          flex: 0 0 80px;
          text-align: center;
          .price {
            font-size: 16px;
            color: @priceColor;
          }
          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
        .close {
          visibility: hidden;
        }
      }
    }
    .foot {
        height: 70px;
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background: #f8f8f8;
        align-items: center;
        .total {
          padding-left: 10px;
          color: #999;
          p {
            &:last-child {
              font-size: 18px;
              color: @priceColor;
            }
          }
        }
      }
  }
}
</style>
