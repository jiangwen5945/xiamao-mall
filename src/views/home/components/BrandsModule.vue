<!-- 热门品牌模块 -->
<template>
  <card-panel  title="热门品牌" sub-title="国际大牌 品质保证" ref="target">
    <!-- 面板标题 -->
    <template v-slot:right>
      <span class="icon-wrap" :class="{disabled:index <= 0}" @click="handleToggle(-1)">
        <j-icon iconClass="arrow-left" color="#fff"/>
      </span>
      <span class="icon-wrap" :class="{disabled:index > pageNum-1}" @click="handleToggle(1)">
        <j-icon iconClass="arrow-right" color="#fff"/>
      </span>
    </template>
    <!-- 面板内容 -->
    <transition name="fade">
      <div class="list-wrap">
        <ul class="goods-list" v-if="hotBrands" :style="{transform:`translateX(${-index*1240}px)`}">
          <li class="list-item" v-for="item in hotBrands" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <module-skeleton :moduleType="'moduleOne'" cardWidth="240px" :itemCount="5" v-else></module-skeleton>
      </div>
    </transition>
  </card-panel>
</template>

<script>
import { ref, computed } from 'vue'
import CardPanel from '../../../components/CardPanel.vue'
import ModuleSkeleton from '../../../components/ModuleSkeleton.vue'
export default {
  components: {
    CardPanel,
    ModuleSkeleton
  },
  props: {
    hotBrands: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    // 页面切换效果
    const index = ref(0)
    const pageNum = computed(() => Math.ceil(props.hotBrands.length / 5) - 1)
    // 切换展示
    const handleToggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > pageNum.value) return
      index.value = newIndex
    }
    return {
      index,
      handleToggle,
      pageNum
    }
  }
}
</script>

<style lang="less" scoped>
.v-enter-active, .v-leave-active {
  transition: all 0.4s ease;
}
.icon-wrap{
  background: @themeColor;
  font-size: 16px;
  line-height: 16px;
  padding: 4px 8px;
  margin-left: 6px;
  color: #fff;
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.list-wrap {
  display: flex;
  width: @baseWidth;
  height: 340px;
  overflow: hidden;
  .goods-list {
    width: 200%;
    display: flex;
    height: 340px;
    align-items: center;
    transform: translateY(-25px);
    transition: all 1s;
    .list-item{
      transition: all .3s linear;
      transform: translate3d(0, 0, 0);
      width: 240px;
      margin-right: 10px;
      flex: 0 0 240px;
      // 重要: 不然会导致切换下一页的时候,起始位置不对
      &:nth-child(5n) {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
        transform: translate3d(0, -10px, 0);
      }
    }
  }
}
</style>
