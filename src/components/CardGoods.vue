<!-- 商品卡片 -->
<template>
  <RouterLink class="goods-card" :style="{height, width}" :to="`/product/${goodsParm.id}`">
    <!-- 内容 -->
      <p class="img-warpper">
        <img :src="goodsParm.picture" />
      </p>
      <p href="# " class="title ellipsis ">{{goodsParm.name}}</p>
      <p class="explain ellipsis ">{{goodsParm.desc}}</p>
      <p href=" " class="price">{{goodsParm.price}}</p>
    <!-- 标签插槽 -->
    <slot></slot>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsCard',
  props: {
    goodsParm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    }
  }
}
</script>
<style lang='less' scoped>
.goods-card {
  display: block;
  margin-bottom: 10px;
  background: #fff;
  padding-bottom: 10px;
  margin: 0 auto;
  // max-height: 380px;
  overflow: hidden;
  transition: all 0.5s;
  flex: none; // 0 0 auto 的简写形式
  position: relative;
  margin-bottom: 10px;
  // max-width: 280px;
  width: 100px;
  height: 100%;
  .img-warpper {
    text-align: center;
    padding-bottom: 20px;
    width: 100%;
    img {
      width: 100%;
      // min-height: 160px;
      // max-height: 264px;
    }
  }

  .title {
    font-size: 14px;
    line-height: 18px;
    color: rgb(33, 33, 33);
    text-align: center;
    padding: 0px 14px;
  }
  .explain {
    color: #b0b0b0;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    padding: 0 14px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    color: @themeColor;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    padding: 0px 14px;
  }
  .addBtn {
    width: 80%;
    height: 20px;
    line-height: 20px;
    margin: 0 auto;
    text-align: center;
    background: #ff6709;
    color: #fff;
    &:hover {
      background: #f55618;
      cursor: pointer;
    }
  }
}
</style>
