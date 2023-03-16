<!-- 新鲜好物模块 -->
<template>
  <card-panel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <!-- 面板标题 -->
    <template #right>
      <jMore path="/" />
    </template>
    <!-- 面板内容 -->
    <div v-if="freshGoods.length">
      <ul class="goods-list">
        <li class="list-item" v-for="item in freshGoods" :key="item.id">
          <card-goods :goodsParm="item"></card-goods>
        </li>
      </ul>
    </div>
    <!-- 骨架屏 -->
    <div v-else>
      <module-skeleton :moduleType="'moduleOne'"></module-skeleton>
    </div>
  </card-panel>
</template>

<script>
// import { useStore } from 'vuex'
import CardPanel from '../../../components/CardPanel.vue'
import CardGoods from '../../../components/CardGoods.vue'
import ModuleSkeleton from '../../../components/ModuleSkeleton.vue'
import { getCurrentInstance, computed } from 'vue'
import { useLazyData } from '@/hooks'
export default {
  name: 'NewsModule',
  components: {
    CardPanel,
    CardGoods,
    ModuleSkeleton
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const { target, result } = useLazyData(proxy.$api.getHomeData, 'freshGoods')
    const freshGoods = computed(() => result.value.slice(0, 4))
    console.log('NewsModule懒加载方式获取数据', result)
    return {
      freshGoods,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: @baseWidth;
}
.goods-list {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .list-item{
    transition: all .3s linear;
    transform: translate3d(0, 0, 0);
    // width: 264px;
    flex: 0 1 264px;
    height: 370px;
    margin-bottom: 20px;
    overflow: hidden;
    &:hover {
      box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -2px, 0);
    }
  }
}
</style>
