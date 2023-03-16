<template>
  <div class="home-panel">
    <div class="header">
      <h4>
        <i class="icon"></i>
        <span class="title">{{ title }}</span>
      </h4>
      <JMore to="" />
    </div>
    <!-- 商品列表 -->
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MemberHomePanel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="less">
.home-panel {
  background-color: #fff;
  padding:20px;
  margin-top: 20px;
  min-height: 490px;
  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 14px;
    .title {
      font-size: 22px;
      font-weight: normal;
      margin-left: 10px;
    }
  }
  .icon {
    color: #333;
    user-select: none;
    line-height: 80px;
    font-style: normal;
    width: 16px;
    height: 16px;
    display: inline-block;
    border-top: 4px solid #27ba9b;
    border-right: 4px solid #27ba9b;
    box-sizing: border-box;
    position: relative;
    transform: rotate(45deg);
    &:before {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      left: 0;
      top: 2px;
      background: #bcf1e6;
    }
  }
}
</style>
