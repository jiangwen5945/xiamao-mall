<template>
  <div class="member-aside">
    <div class="user-manage">
      <h4>我的账户</h4>
      <ul>
        <li>
          <RouterLink to="/member" exact-active-class="active">个人中心</RouterLink>
        </li>
        <li><a href="javascript:;">消息通知</a></li>
        <li><a href="javascript:;">个人信息</a></li>
        <li><a href="javascript:;">安全设置</a></li>
        <li><a href="javascript:;">地址管理</a></li>
        <li><a href="javascript:;">我的积分</a></li>
        <li><a href="javascript:;">我的足迹</a></li>
        <li><a href="javascript:;">邀请有礼</a></li>
        <li><a href="javascript:;">幸运抽奖</a></li>
      </ul>
      <h4>交易管理</h4>
      <ul>
        <li>
          <RouterLink to="/member/order" active-class="active">我的订单</RouterLink>
        </li>
        <li><a href="javascript:;">优惠券</a></li>
        <li><a href="javascript:;">礼品卡</a></li>
        <li><a href="javascript:;">评价晒单</a></li>
        <li><a href="javascript:;">售后服务</a></li>
      </ul>
      <h4>我的收藏</h4>
      <ul>
        <li><a href="javascript:;">收藏的商品</a></li>
        <li><a href="javascript:;">收藏的专题</a></li>
        <li><a href="javascript:;">关注的品牌</a></li>
      </ul>
      <h4>帮助中心</h4>
      <ul>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">在线客服</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberAside'
}
</script>

<style scoped lang='less'>
.member-aside {
  width: 220px;
  margin-right: 20px;
  border-radius: 2px;
  .user-manage {
    background-color: #fff;
    h4 {
      font-size: 18px;
      font-weight: 400;
      padding: 20px 52px 5px;
      border-top: 1px solid #f6f6f6;
    }
    ul {
      padding: 0 52px 10px;
    }
    a {
      display: block;
      line-height: 1;
      padding: 15px 0;
      font-size: 14px;
      color: #666;
      position: relative;

      &:hover{
        color: @themeColor;
      }
      &.active {
        color: @themeColor;

        &:before {
          display: block;
        }
      }

      &:before {
        content: "";
        display: none;
        width: 4px;
        height: 16px;
        // border-radius: 50%;
        position: absolute;
        top: 14px;
        left: -14px;
        background-color: @themeColor;
      }
    }
  }
}
</style>
