<template>
  <ul class="goods-sales">
    <li>
      <j-icon iconClass="icon" size="20" color="#27BA9B">销量人气</j-icon>
      <p>200+</p>
    </li>
    <li>
      <j-icon iconClass="pingjia" size="20" color="#27BA9B">商品评价</j-icon>
      <p>400+</p>
    </li>
    <li>
      <j-icon iconClass="shoucang" size="20" color="#27BA9B">收藏人气</j-icon>
      <p>600+</p>
    </li>
    <li>
      <j-icon iconClass="pinpai" size="20"  color="#27BA9B">品牌信息</j-icon>
      <p>自营</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GoodsSales'
}
</script>

<style scoped lang='less'>
.goods-sales {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 0px;
      left: 0;
      height: 50px;
      border-left: 1px solid #e4e4e4;
      content: "";
    }
    p {
      color: @priceColor;
    }
  }
}
</style>
