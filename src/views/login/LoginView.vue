<template>
<!-- API: {{ process.env.VUE_APP_API }}
URL: {{ process.env.BASE_URL }} -->
<LoginHeader>欢迎登录</LoginHeader>
<section class="login-section">
  <div class="login-box">
    <nav>
      <a @click="()=>activeName='account'" :class="{active:activeName==='account'}" href="javascript:;">账户登录</a>
      <a @click="()=>activeName='qrcode'" :class="{active:activeName==='qrcode'}" href="javascript:;">扫码登录</a>
    </nav>
    <!-- 表单 -->
    <div v-if="activeName==='account'" class="account-box">
      <LoginForm v-if="activeName==='account'"></LoginForm>
    </div>
    <!-- 二维码 -->
    <div v-if="activeName==='qrcode'" class="qrcode-box">
      <img src="@/assets/images/qrcode.jpg" alt="">
      <p>打开 <a href="javascript:;">瞎猫App</a> 扫码登录</p>
    </div>
  </div>
</section>
<LoginFooter />
</template>

<script>
import LoginHeader from './components/LoginHeader.vue'
import LoginFooter from './components/LoginFooter.vue'
import LoginForm from './components/login-form.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'LoginView',
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm
  },
  setup () {
    // console.log('BASE_URL: ', process.env.BASE_URL)
    // console.log('VUE_APP_API: ', process.env.VUE_APP_API)
    const activeName = ref('account')
    // 记录跳转登录前的地址，提供QQ回调页使用
    const store = useStore()
    const route = useRoute()
    store.commit('user/setRedirectUrl', route.query.redirectUrl)
    const dialogVisible = ref(true)
    return {
      activeName,
      dialogVisible
    }
  }
}
</script>

<style lang="less" scoped>
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;

  .login-box {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);

    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        font-weight: normal;

        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }

        &.active {
          color: @themeColor;
          font-weight: bold;
        }
      }
    }

    .qrcode-box {
      text-align: center;
      padding-top: 40px;

      p {
        margin-top: 20px;

        a {
          color: @themeColor;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
