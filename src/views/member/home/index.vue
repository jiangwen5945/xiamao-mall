<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <MemberPanel title="我的收藏">
      <!-- 面板内容 -->
      <div v-if="collectList.length">
        <ul class="goods-list">
          <li class="list-item" v-for="item in collectList" :key="item.id">
            <card-goods :goodsParm="item"></card-goods>
          </li>
        </ul>
      </div>
      <!-- 骨架屏 -->
      <div v-else>
        <j-empty imageSize="200px" description="暂无收藏商品"></j-empty>
      </div>
    </MemberPanel>
    <!-- 足迹 -->
    <MemberPanel title="我的足迹">
      <div v-if="footmarkList.length">
        <ul class="goods-list">
          <li class="list-item" v-for="item in footmarkList" :key="item.id">
            <card-goods :goodsParm="item"></card-goods>
          </li>
        </ul>
      </div>
      <div v-else>
        <j-empty imageSize="200px" description="暂无浏览足迹"></j-empty>
      </div>
    </MemberPanel>
    <!-- 猜你喜欢 -->
    <!-- <GoodsRelevant /> -->
  </div>
</template>
<script>
import HomeOverview from './components/Overview'
import MemberPanel from './components/MemberPanel.vue'
import CardGoods from '@/components/CardGoods.vue'
import { useMapState, useMapActions } from '@/hooks/useMap'
export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    MemberPanel,
    CardGoods
  },
  setup () {
    // 执行对应的dispatch方法
    const memberAction = useMapActions('member', ['findCollect', 'findFootmark'])
    for (const key in memberAction) {
      if (Object.hasOwnProperty.call(memberAction, key)) {
        memberAction[key]()
      }
    }
    // 获取对应的state
    const memberState = useMapState('member', ['collectList', 'footmarkList'])
    return { ...memberState }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  padding-top: 20px;
  .list-item{
    transition: all .3s linear;
    transform: translate3d(0, 0, 0);
    width: 23%;
    margin-bottom: 20px;
    &:hover {
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -2px, 0);
    }
    &:not(:nth-child(4n)) {
      margin-right: calc(8% / 4);
    }
  }
}
</style>
