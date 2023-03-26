<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter"/>
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort  @sort-change="changeSort"/>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <card-goods :goodsParm="goods" width="80%"></card-goods>
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <JInfiniteLoading :loading="loading" :finished="finished" @infinite="getData"/>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CardGoods from '@/components/CardGoods.vue'
import Api from '@/api'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, CardGoods },
  setup () {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      Api.findSubCategoryGoods(reqParams).then(res => {
        if (res.items.length) {
          goodsList.value.push(...res.items)
          reqParams.page++
        } else {
          // 没有数据，代表加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }
    // 切换二级分类重新加载
    watch(() => route.params.id, (newVal) => {
      if (newVal && ('/category/sub/' + newVal) === route.path) {
        goodsList.value = []
        finished.value = false
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    }, { immediate: true })

    // 监听筛选改变
    const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
      getData() // 拉取筛选后的商品数据
    }
    // 监听排序改变
    const changeSort = (sortParams) => {
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
      getData() // 拉取排序后的商品数据
    }
    return { loading, finished, goodsList, getData, changeFilter, changeSort }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
    // justify-content: space-between;
    li {
      flex: 0 1 19%;
      display: inline-block;
      transition: all .3s linear;
      transform: translate3d(0, 0, 0);
      margin-bottom: 20px;
      padding-top: 20px;
      overflow: hidden;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      &:hover {
        box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
        transform: translate3d(0, -2px, 0);
      }
      // ***** 解决flex布局中使用justify-content:space-between下,需要最后一行列表左对齐 *****
      // 方法一: 不使用justify-content:space-between,模拟space-between和间隙
      &:not(:nth-child(5n)) {
        margin-right: calc(5% / 4);
      }

      // 方法二: 根据个数最后一个元素动态margin
      // &:last-child:nth-child(5n - 1) {
      //     margin-right: calc(19% * 1 + 5% / 4);
      // }
      // &:last-child:nth-child(5n - 2) {
      //     margin-right: calc(19% * 2 + 5% / 4);
      // }
      // &:last-child:nth-child(5n - 3) {
      //     margin-right: calc(19% * 3 + 5% / 4);
      // }
      // &:last-child:nth-child(5n - 4) {
      //     margin-right: calc(19% * 4 + 5% / 4);
      // }
    }
  }
}
</style>
