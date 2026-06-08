<template>
  <div class="card-panel">
    <div class="head" v-if="title" :style="customizeStyle">
      <h3 class="title">{{ title }}<small>{{ subTitle }}</small></h3>
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
    subTitle: {
      type: String,
      default: ''
    },
    customizeStyle: {
      type: Object,
      default: () => {
        return {}
      }
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
    margin: 20px 0;
    display: flex;
    align-items: flex-end;
    .title {
      flex: 1;
      font-size: 22px;
      font-weight: 200;
      color: #333;
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
