 <!-- 首页 -->
<template>
  <div class='home-container'>
    <!-- 首页头部 -->
    <common-category
      :categoryList="categoryBanners"
      :sliderList="imageBanners"
      :imgRecommends="imgRecommends"
    ></common-category>
    <!-- 热门品牌模块 -->
    <brands-module :hotBrands="hotBrands"></brands-module>
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
    NewsModule,
    GoodsModule,
    BrandsModule
  },
  setup () {
    // 获取首页数据
    const store = useStore()
    const homeData = computed(() => store.state.homeData)
    return {
      ...homeData.value
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
