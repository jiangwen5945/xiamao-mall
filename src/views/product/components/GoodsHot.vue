<template>
<div class="goods-hot">
  <h3>{{title}}</h3>
  <div>
    <CardGoods v-for="item in goodsHot" :key="item.id" :goodsParm="item"/>
  </div>
</div>
</template>

<script>
import { getCurrentInstance, computed, ref } from 'vue'
import CardGoods from '@/components/CardGoods.vue'
export default {
  name: 'GoodsHot',
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  components: { CardGoods },
  setup (props) {
    const titleObj = {
      1: '24小时热销榜',
      2: '周热销榜',
      3: '总热销榜'
    }
    const title = computed(() => {
      return titleObj[props.type]
    })
    // 获取热销商品
    const { proxy } = getCurrentInstance()
    const goodsHot = ref(null)
    proxy.$api.getGoodsHot().then(res => {
      res.splice(4)
      goodsHot.value = res
    })
    return {
      title,
      goodsHot
    }
  }
}
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
}
</style>
