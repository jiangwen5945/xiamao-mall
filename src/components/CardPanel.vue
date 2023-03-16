<template>
  <div class="card-panel" :style="{width: width}">
    <div class="head"  v-if="title">
      <h3>{{ title }}<small>{{ subTitle }}</small></h3>
      <slot name="right" />
    </div>
    <!-- 没有数据时候的骨架屏标题 -->
    <div class="skeleton-header" v-else>
      <j-skeleton width="100%" height='42px' animated/>
    </div>
    <!-- 插槽内容 -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardPanel',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '1240px'
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='less'>
.card-panel {
  // width: @baseWidth;
  margin: 0 auto;
  position: relative;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: 400;
      height: 35px;
      line-height: 35px;
      text-align: left;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
  .skeleton-header {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }
}
</style>
