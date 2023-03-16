<template>
  <div class="common-layout">
    <header>
      <common-header :categoryList="homeData.categoryBanners"></common-header>
      <sticky-header :categoryList="homeData.categoryBanners"></sticky-header>
    </header>
    <main>
      <router-view></router-view>
      <tool-bar></tool-bar>
    </main>
    <footer>
      <common-footer></common-footer>
    </footer>
  </div>
  <div class="box" style="--l:0"></div>
<div class="box" style="--l:0.2"></div>
<div class="box" style="--l:0.4"></div>
<div class="box" style="--l:0.6"></div>
<div class="box" style="--l:0.8"></div>
<div class="box" style="--l:1"></div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'
import CommonFooter from '@/components/CommonFooter.vue'
import StickyHeader from '@/components/StickyHeader.vue'
import ToolBar from '@/components/ToolBar.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'LayoutView',
  components: {
    CommonHeader,
    CommonFooter,
    StickyHeader,
    ToolBar
  },
  setup () {
    // 获取首页数据
    const store = useStore()
    store.dispatch('getHomeData')
    const homeData = computed(() => store.state.homeData)
    return {
      homeData
    }
  }
}
</script>

<style scoped lang='less'>
  main{
    min-height: calc(100vh - 698px);
    padding: 0;
  }
</style>
