<template>
<div class="goods-container" v-if="goods">
  <!-- 面包屑 -->
  <JBread>
    <JBreadItem to="/">首页</JBreadItem>
    <JBreadItem :to="'/category/'+ goods.categories[1].id">{{goods.categories[1].name}}</JBreadItem>
    <JBreadItem :to="'/category/sub/'+ goods.categories[0].id">{{goods.categories[0].name}}</JBreadItem>
    <JBreadItem>{{goods.name}}</JBreadItem>
  </JBread>
  <!-- 商品信息 -->
  <div class="goods-info">
    <div class="media">
      <GoodsImage :images="goods.mainPictures"/>
      <GoodsSales />
    </div>
    <div class="spec">
      <GoodsInfo :goods="goods"/>
      <GoodsSku :goods="goods" @change="changeSku"/>
      <JNumbox label="数量" v-model="num" :max="goods.inventory"/>
      <div class="btn-group">
        <j-button type="primary" @click="insertCart">加入购物车</j-button>
        <j-button type="plain" @click="insertCollect">加入收藏</j-button>
      </div>
    </div>
  </div>
  <!-- 商品内容 -->
  <div class="goods-detail">
    <div class="goods-article">
      <!-- 详情+评价 -->
      <GoodsTabs/>
      <!-- 注意事项 -->
      <div class="goods-warn">
        <GoodsWarn/>
      </div>
    </div>
    <!-- 相关热销+专题推荐 -->
    <div class="goods-aside">
      <GoodsHot :goods="goods.hotByDay" :type="1" />
    </div>
  </div>
</div>
<!-- 骨架屏 -->
<div class="goods-container" v-else>
  <JSkeleton width="1240px" height="1000px" padding="30px 0 "  animated/>
</div>
</template>

<script>
import GoodsImage from './components/GoodsImage'
import GoodsSales from './components/GoodsSales'
import GoodsInfo from './components/GoodsInfo'
import GoodsSku from './components/GoodsSku'
import GoodsTabs from './components/GoodsTabs'
import GoodsWarn from './components/GoodsWarn'
import GoodsHot from './components/GoodsHot'
import { getCurrentInstance, ref, provide } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'GoodSView',
  components: {
    GoodsImage,
    GoodsSales,
    GoodsInfo,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const goods = ref(null)
    const num = ref(1)
    const currSku = ref(null)
    // 获取商品详情
    proxy.$api.getGoodsDetail({ id: route.params.id }).then(res => {
      console.log('获取商品详情', res)
      goods.value = res
    })
    provide('goods', goods)
    // 获取选中商品规格
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
        currSku.value = sku
      } else {
        currSku.value = null
      }
      console.log('获取选中商品规格', goods)
    }
    // 加入购物车
    const insertCart = () => {
      console.log('加入购物车')
      if (!currSku.value) {
        return proxy.$message({ message: '请选择商品规格', type: 'warn' })
      }
      if (num.value > goods.value.inventory) {
        return proxy.$message({ message: '库存不足', type: 'warn' })
      }
      store.dispatch('cart/insertCart', {
        id: goods.value.id,
        skuId: currSku.value.skuId,
        name: goods.value.name,
        picture: goods.value.mainPictures[0],
        price: currSku.value.price,
        nowPrice: currSku.value.price,
        count: num.value,
        attrsText: currSku.value.specsText,
        selected: true,
        isEffective: true,
        stock: currSku.value.inventory
      }).then(() => {
        proxy.$message({ message: '加入购物车成功', type: 'success' })
      })
    }
    // 加入收藏
    const insertCollect = () => {
      // 是否登录
      if (!store.state.user.profile.token) {
        return proxy.$confirm({ text: '当前状态未登录,是否登录?' }).then(() => {
          router.push('/login')
        }).catch()
      }
      // 是否选择规格
      if (!currSku.value) {
        return proxy.$message({ message: '请选择商品规格', type: 'warn' })
      }
      store.dispatch('collect/insertCollect', {
        id: goods.value.id,
        skuId: currSku.value.skuId,
        name: goods.value.name,
        picture: goods.value.mainPictures[0],
        price: currSku.value.price,
        nowPrice: currSku.value.price,
        count: num.value,
        attrsText: currSku.value.specsText,
        selected: true,
        isEffective: true,
        stock: currSku.value.inventory
      }).then(() => {
        proxy.$message({ message: '收藏成功', type: 'success' })
      })
    }
    return { goods, num, insertCart, insertCollect, changeSku }
  }
}
</script>

<style lang="less" scoped>
.goods-container {
  width: @baseWidth;
  margin: 0 auto;

  .goods-info {
    width: 100%;
    min-height: 600px;
    background: #fff;
    margin-bottom: 20px;
    display: flex;
    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }
    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
      .btn-group{
        margin-top: 20px;
      }
    }
  }
  .goods-detail {
    width: 100%;
    display: flex;

    .goods-article {
      flex: 0 0 940px;
      // background: rgb(231, 98, 98);
      margin-right: 20px;
      // height: 800px;
    }

    .goods-aside {
      flex: 1;
      // background: rgb(198, 223, 55);
      // height: 800px;
    }
  }
}
</style>
