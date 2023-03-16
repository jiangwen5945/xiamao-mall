<template>
  <div class="category-container">
    <!-- 通用面包屑 -->
    <JBread>
      <JBreadItem to="/">首页</JBreadItem>
      <transition name="fade-right" mode="out-in">
        <JBreadItem to="/cart"  :key="topCategory.id">{{topCategory.name}}</JBreadItem>
      </transition>
    </JBread>
    <!-- 分类轮播 -->
    <div class="slider-box">
      <JCarousel :sliders="imageBanners"></JCarousel>
    </div>
    <!-- 一级分类 -->
    <div class="total-box">
        <h3>{{topCategory.name}}分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id" @click="$router.push(`/category/sub/${item.id}`)">
            <a href="javascript:;">
              <img :src="item.picture" >
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
    </div>
    <!-- 二级分类 -->
    <div class="sub-box"  v-for="item in topCategory.children" :key="item.id">
      <template  v-if="item.goods.length !== 0">
        <h3>{{item.name}}</h3>
        <ul class="sub-list">
          <li v-for="subitem in item.goods" :key="subitem.id" @click="$router.push(`/product/${subitem.id}`)">
            <card-goods :goodsParm="subitem"></card-goods>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import CardGoods from '@/components/CardGoods.vue'
import { useStore } from 'vuex'
import Api from '@/api'
import { useRoute } from 'vue-router'
export default {
  name: 'CategoryView',
  components: {
    CardGoods
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    console.log('route', route.params.id)

    // 获取所有一级分类信息
    // const topCategory = computed(() => {
    //   const topCategory = store.state.homeData.categoryBanners.find(item => {
    //     return item.id === route.params.id
    //   })
    //   if (!topCategory) return false
    //   return topCategory
    // })
    // 获取单个一级分类下的商品信息
    const topCategory = ref([])
    const getSubList = () => {
      Api.findTopCategory(route.params.id).then(res => {
        console.log('一级分类', res)
        topCategory.value = res
      })
    }
    getSubList()
    // 根据切换路由的时候，根据分类ID获取数据，渲染分类商品
    watch(() => route.params.id, (newVal) => {
      // newVal && getSubList() => 切换到二级类目路由的时候也有ID，但是也触发了watch导致发送了请求，需要处理。
      console.log('route.path', route)
      newVal && `/category/${newVal}` === route.path && getSubList()
    })
    // 轮播图片
    const imageBanners = store.state.homeData.imageBanners
    return {
      topCategory,
      imageBanners
    }
  }
}
</script>

<style lang="less" scoped>
.category-container {
  width: @baseWidth;
  margin: 0 auto;

  .slider-box{
    width: 100%;
    height: 450px;
  }
  .total-box {
    margin-top: 20px;
    background-color: #fff;
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @themeColor;
          }
        }
      }
    }
  }
  .sub-box{
    margin-top: 20px;
    background-color: #fff;
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
    ul {
      width: 100%;
      padding:  0 32px;
      li {
        transition: all .3s linear;
        transform: translate3d(0, 0, 0);
        margin-bottom: 20px;
        overflow: hidden;
        width: 20%;
        display: inline-block;
        &:not(:nth-child(4n)) {
          margin-right: calc(20% / 3);
        }
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
          transform: translate3d(0, -2px, 0);
        }
      }
    }
  }
}
</style>
