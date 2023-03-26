<!-- 各类商品模块 -->
<template>
  <div ref="target" class="goods-module">
    <card-panel :title="item.name" v-for="item in categoryBanners" :key="item.id">
      <!-- 面板标题 -->
      <template #right>
        <jMore :path="`/category/${item.id}`" />
      </template>
      <!-- 面板内容 -->
      <div class="panel-main" v-if="item.goods.length">
        <div class="banner">
          <img :src="item.picture" alt=""/>
        </div>
        <ul class="goods-list">
          <li class="list-item" v-for="subItem in item.goods" :key="subItem.id">
            <card-goods :goodsParm="subItem" width="85%"  height="302px"></card-goods>
            <transition>
              <div class="hideBtn">
                <h3>查看详情</h3>
              </div>
            </transition>
          </li>
        </ul>
      </div>
      <!-- 骨架屏 -->
      <module-skeleton :moduleType="'moduleTwo'" v-else></module-skeleton>
    </card-panel>
  </div>
</template>

<script>
// import { useStore } from 'vuex'
import CardPanel from '../../../components/CardPanel.vue'
import CardGoods from '../../../components/CardGoods.vue'
import { getCurrentInstance, computed } from 'vue'
import { useLazyData } from '@/hooks'
import ModuleSkeleton from '../../../components/ModuleSkeleton.vue'
export default {
  components: {
    CardPanel,
    CardGoods,
    ModuleSkeleton
  },
  setup () {
    // 懒加载方式获取数据
    const { proxy } = getCurrentInstance()
    const { target, result } = useLazyData(proxy.$api.getHomeData, 'categoryBanners')
    const categoryBanners = computed(() => result.value.slice(0, 4))
    // console.log('GoodsModule懒加载方式获取数据', result)
    // 常规方式获取数据
    // const store = useStore()
    // const cacheHomeData = JSON.parse(sessionStorage.getItem('HOME-INFO'))
    // const { categoryBanners } = computed(() => cacheHomeData || store.state.homeData).value
    // foodsBanner && foodsBanner.goods.splice(8) // foodsBanner数据存在的前提下，截取前8个数据
    return {
      categoryBanners,
      target
    }
  }
}
</script>

<style lang="less" scoped>
// 元素进入｜结束时，过渡的效果
.v-enter-active, .v-leave-active {
  transition: all 0.4s ease;
}

// 元素开始进入的状态|元素离开结束的状态
.v-enter-from, .v-leave-to {
  // height: 0px !important;
  opacity: 0;
}
.panel-main{
  display: flex;
  width: @baseWidth;
  .banner {
    height: 614px;
    width: 234px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }
  .goods-list {
    width: 990px;
    margin-bottom: 20px;
    height: 614px;
    overflow: hidden;
    .list-item {
      position: relative;
      margin-bottom: 10px;
      padding-top: 8px;
      width: 237px;
      height: 302px;
      overflow: hidden;
      background: #fff;
      display: inline-block;
      &:not(:nth-child(4n)) {
        margin-right: calc(4% / 3);
      }
      &:hover {
        border: 1px solid @themeColor;
        .hideBtn {
          transition: all 0.3s linear;
          transform: none;
          opacity: 1;
        }
      }
      .hideBtn{
        width: 234px;
        height: 80px;
        line-height: 80px;
        background: @themeColor;
        position: absolute;
        bottom: 0;
        left: 0;
        opacity:0;
        transform: translateY(100%);
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
