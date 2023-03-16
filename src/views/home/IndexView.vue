 <!-- 首页 -->
<template>
  <div class='home-container'>
    <!-- 首页头部 -->
    <common-category :categoryList="homeData.categoryBanners" :sliderList="homeData.imageBanners"></common-category>
    <!-- 热门品牌模块 -->
    <brands-module :hotBrands="homeData.hotBrands"></brands-module>
    <!-- 各类商品模块 -->
    <goods-module></goods-module>
    <!-- 新鲜好物模块 -->
    <news-module></news-module>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CommonCategory from './components/CategoryModule.vue'
import NewsModule from './components/NewsModule.vue'
import GoodsModule from './components/GoodsModule.vue'
import BrandsModule from './components/BrandsModule.vue'
export default {
  name: 'IndexView',
  components: {
    CommonCategory,
    // CommonCarousel,
    NewsModule,
    GoodsModule,
    BrandsModule
  },
  setup () {
    console.log('运行环境: ', process.env.NODE_ENV)
    console.log('BASE_URL: ', process.env.BASE_URL)
    console.log('VUE_APP_API: ', process.env.VUE_APP_API)
    // 获取首页数据
    const store = useStore()
    const homeData = computed(() => store.state.homeData)
    return {
      homeData
    }
  }
}
</script>

<style scoped lang='less'>
  .home-container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
