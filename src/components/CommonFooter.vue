<template>
  <footer class="app-footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd>
            <p>在线客服</p>
            <j-icon iconClass="kefu" size="34px"/>
          </dd>
          <dd>
            <p>问题反馈</p>
            <j-icon iconClass="fankui" size="34px"/>
          </dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd>
            <p>公众号</p>
            <j-icon iconClass="gongzhonghao" size="34px"/>
          </dd>
          <dd>
            <p>微博</p>
            <j-icon iconClass="xinlangweibo" size="34px"/>
          </dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img :src="require('@/assets/images/qrcode.jpg')" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="other-wrap">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <j-icon iconClass="price" size="40px" fontSize="26px" color="#fff">价格亲民</j-icon>
          </a>
          <a href="javascript:;">
            <j-icon iconClass="wuliu" size="40px" fontSize="26px" color="#fff">物流快捷</j-icon>
          </a>
          <a href="javascript:;">
            <j-icon iconClass="pinzhi" size="40px" fontSize="26px" color="#fff">品质新鲜</j-icon>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 瞎猫网</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CommonFooter'
}
</script>

<style scoped lang='less'>

.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      p{
        margin-bottom: 10px;
      }
      &:hover {
        color: @themeColor
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }
    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: @themeColor
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .other-wrap {
    background-color: #333;
  }
  .slogan {
    display: flex;
    justify-content: space-between;
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      display: flex;
      align-items: center;
    }
  }
  .copyright {
    height: 150px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
