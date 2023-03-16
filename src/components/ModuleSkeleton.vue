<template>
  <div class="module-one" v-if="moduleType === 'moduleOne'">
    <div class="group-skeleton" :style="{width:moduleWidth}">
      <div class="card-skeleton"  v-for="item in itemCount" :key="item" >
        <jSkeleton :width="cardWidth" height="264px"></jSkeleton>
        <jSkeleton :width="cardWidth" height="14px" padding="0 20px" margin="20px 0 0 0"></jSkeleton>
        <jSkeleton :width="cardWidth" height="12px" padding="0 40px" margin="10px 0 0 0"></jSkeleton>
        <jSkeleton :width="cardWidth" height="12px" padding="0 40px" margin="10px 0 0 0"></jSkeleton>
      </div>
    </div>
  </div>
  <div class="module-two" v-if="moduleType === 'moduleTwo'">
    <div class="banner-skeleton">
      <jSkeleton width="234px" height="614px"></jSkeleton>
    </div>
    <div class="group-skeleton2" :style="{width:moduleWidth}">
      <div class="card-skeleton"  v-for="item in 8" :key="item" >
        <jSkeleton width="206px" height="206px"></jSkeleton>
        <jSkeleton width="206px" height="14px" margin="16px 0 0 0" padding="0 14px"></jSkeleton>
        <jSkeleton width="206px" height="14px" margin="8px 0 0 0" padding="0 10px"></jSkeleton>
        <jSkeleton width="206px" height="14px" margin="8px 0 0 0" padding="0 30px"></jSkeleton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleSkeleton',
  props: {
    moduleType: {
      type: String,
      default: 'moduleOne'
    },
    cardWidth: {
      type: String,
      default: '264px'
    },
    moduleWidth: {
      type: String,
      default: '100%'
    },
    itemCount: {
      type: Number,
      default: 4
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .module-one {
    display: flex;
    width: @baseWidth;
    .group-skeleton{
      display: flex;
      justify-content: space-between;
      .card-skeleton {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 20px;
        background: #fff;
      }
    }
  }
  .module-two{
    display: flex;
    width: @baseWidth;
    .banner-skeleton{
      height: 614px;
      width: 234px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 14px;
    }
    .group-skeleton2{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex: 1;
      margin-bottom: 20px;
      height: 614px;
      overflow: hidden;
      .card-skeleton{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: 10px;
        padding-top: 10px;
        width: 234px;
        height: 302px;
        overflow: hidden;
        background: #fff
      }
    }
  }
</style>
