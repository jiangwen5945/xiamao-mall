<template>
  <JBread>
    <JBreadItem to="/">首页</JBreadItem>
    <JBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</JBreadItem>
    <Transition name="fade-right" mode="out-in">
      <JBreadItem v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</JBreadItem>
    </Transition>
  </JBread>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup () {
    // 1. 获取二级分类的ID，在地址在路由中
    const route = useRoute()
    // 2. 获取vuex中的类目数据
    const store = useStore()
    // 3. 通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
    const category = computed(() => {
      const obj = {}
      store.state.homeData.categoryBanners.forEach(top => {
        top.children && top.children.forEach(sub => {
          if (sub.id === route.params.id) {
            // 设置二级类目
            obj.sub = { id: sub.id, name: sub.name }
            // 设置一级类目
            obj.top = { id: top.id, name: top.name }
          }
        })
      })
      return obj
    })
    // 模版需要使用的东西需要setup返回
    return { category }
  }
}
</script>
<style scoped lang="less"></style>
