<template>
  <!-- 概览 -->
  <div class="member-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img :src="$store.state.user.profile.avatar"/>
      </div>
      <h4>{{$store.state.user.profile.nickname}}</h4>
    </div>
    <div class="item">
      <a href="javascript:;">
        <j-icon iconClass="huiyuan" color="#fff" size="34"/>
        <p>会员中心</p>
      </a>
      <a href="javascript:;">
        <j-icon iconClass="anquanshezhi" color="#fff" size="34"/>
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <j-icon iconClass="address" color="#fff" size="34"/>
        <p>地址管理</p>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MemberOverview'
}
</script>
<style scoped lang="less">
.member-overview {
  height: 132px;
  background: url(../../../../assets/images/center-bg.png) no-repeat center / cover;
  display: flex;
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:first-child {
      border-right: 1px solid #f4f4f4;
    }
    a {
      color: white;
      font-size: 16px;
      text-align: center;
      p {
        line-height: 32px;
      }
    }
  }
}
</style>
