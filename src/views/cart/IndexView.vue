<template>
  <div class="cart-page">
    <div class="container">
      <JBread>
        <JBreadItem to="/">首页</JBreadItem>
        <JBreadItem>购物车</JBreadItem>
      </JBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <j-checkbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']" label="全选" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody v-if="$store.getters['cart/validList'].length>0">
            <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
              <td>
                <j-checkbox @change="$event=>checkOne(item.skuId,$event)" :modelValue="item.selected"/>
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="">
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <!-- 选择规格组件 -->
                    <CartSku :attrs-text="item.attrsText" :skuId="item.skuId" @change = "$event=>updateCartSku(item.skuId,$event)"/>
                    <!-- <p class="attr">{{item.attrsText}}</p> -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{item.nowPrice}}</p>
                <p v-if="item.price-item.nowPrice>0">
                  比加入时降价
                  <span class="red">&yen;{{item.price-item.nowPrice}}</span>
                </p>
              </td>
              <td class="tc">
                 <!-- 选择数量组件 -->
                <JNumbox :max="item.stock" @change="$event=>changeCount(item.skuId,$event)" :modelValue="item.count" />
              </td>
              <td class="tc"><p class="f16 red">&yen;{{item.nowPrice*100*item.count/100}}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a @click="deleteCart(item)" class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>

          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length>0">
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="item in $store.getters['cart/invalidList']" :key="item.skuId">
              <td>
                <j-checkbox/>
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="">
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <p class="attr">{{item.attrsText}}</p>
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;{{item.nowPrice}}</p></td>
              <td class="tc"><JNumbox :max="item.stock" @change="$event=>changeCount(item.skuId,$event)" :modelValue="item.count" /></td>
              <td class="tc"><p>&yen;{{item.nowPrice*100*item.count/100}}</p></td>
              <td class="tc">
                <p><a @click="deleteCart(item.skuId)" class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>

          <!-- 没有任何商品 -->
          <tbody v-if="!($store.getters['cart/invalidList'].length>0 || $store.getters['cart/validList'].length>0)">
            <tr>
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <j-checkbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']" label="全选" />
          <a @click="batchDeleteCart(false)" href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a @click="batchDeleteCart(true)" href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedTotal']}} 件，商品合计：
          <span class="red">¥{{$store.getters['cart/selectedAmount']}}</span>
          <j-button type="primary" @click="goCheckout()">下单结算</j-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
import CartNone from './components/cart-none.vue'
import CartSku from './components/cart-sku'
import { useRouter } from 'vue-router'
export default {
  name: 'CartPage',
  components: {
    CartNone,
    CartSku
  },
  setup () {
    const store = useStore()
    // 单选
    const checkOne = (skuId, selected) => {
      store.dispatch('cart/updateCart', { skuId, selected })
    }
    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAllCart', selected)
    }
    // 删除
    const deleteCart = (item) => {
      Confirm({ text: '您确定从购物车删除该商品吗？' }).then(() => {
        Message({ type: 'success', message: '删除成功' })
        store.dispatch('cart/deleteCart', item.skuId)
      }).catch(e => e)
    }
    // 批量删除
    const batchDeleteCart = (isClear) => {
      if (isClear) {
        // 清除失效商品列表
        if (store.getters['cart/invalidList'].length === 0) {
          Message({ type: 'warn', message: '没有失效的商品' })
          return false
        }
      } else {
        // 清除勾选的商品列表
        if (store.getters['cart/selectedList'].length === 0) {
          Message({ type: 'warn', message: '请勾选需要删除的商品' })
          return false
        }
      }

      Confirm({ text: `您确定从购物车删除${isClear ? '失效' : '选中'}的商品吗？` }).then(() => {
        Message({ type: 'success', message: '删除成功' })
        store.dispatch('cart/batchDeleteCart', isClear)
      }).catch(e => {})
    }
    // 修改数量
    const changeCount = (skuId, count) => {
      store.dispatch('cart/updateCart', { skuId, count })
    }
    // 修改规格
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }
    // 跳转结算页面
    const router = useRouter()
    const goCheckout = () => {
      // 1. 判断是否选择有效商品
      if (store.getters['cart/selectedTotal'] === 0) return Message({ message: '至少选中一件商品才能结算', type: 'warn' })
      // 2. 判断是否已经登录，未登录 弹窗提示
      if (!store.state.user.profile.token) {
        Confirm({ text: '下单结算需要登录，是否去登录？' }).then(() => {
          // 点击确认
          router.push('/login')
        }).catch(e => {})
      } else {
        // 3. 进行跳转 （需要做访问权限控制）
        router.push('/member/checkout')
      }
    }

    return { checkOne, checkAll, deleteCart, batchDeleteCart, changeCount, updateCartSku, goCheckout }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @themeColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
  padding: 0 30px;
  .batch {
    display: flex;
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
