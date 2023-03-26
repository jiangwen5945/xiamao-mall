<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container"
  >
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <j-icon iconClass="pinpai" size="30" fontSize="18px" :color="{ '#27BA9B': hasAccount }">已有账号，请绑定手机</j-icon>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <j-icon iconClass="comment" size="30" fontSize="18px" :color="{ '#27BA9B': hasAccount }">没有账号，请完善资料</j-icon>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :nickname="userName" :avatar="userAvatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import LoginHeader from './components/LoginHeader'
import LoginFooter from './components/LoginFooter'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
import QC from 'qc'
export default {
  name: 'PageCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup () {
    const { proxy } = getCurrentInstance()
    const hasAccount = ref(true)
    const userName = ref(null)
    const userAvatar = ref(null)
    const isBind = ref(true)
    const store = useStore()
    const router = useRouter()
    // console.log(store, router)
    // 检查是否已经QQ登录
    if (QC.Login.check()) {
      // 假设已经绑定，默认会去做一次登录，如果登录失败证明未绑定。
      QC.Login.getMe((openId) => {
        // console.log('openId', openId)
        // 已注册已绑定（mock数据）
        // const mId1 = openId
        // 已注册未绑定（mock数据）
        // const mId2 = 'a123456'
        // 未注册（mock数据）
        // const mId3 = '12345'
        proxy.$api.userQQLogin('a123456').then(res => {
          // 使用qq登录成功
          const { id, account, avatar, mobile, nickname, token } = res
          userName.value = nickname
          userAvatar.value = avatar

          // 判断该账号的手机号码是否绑定
          if (mobile) {
            // 已注册已绑定
            // 1. 存储用户信息
            store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
            // 2. 合并购物车操作
            store.dispatch('cart/mergeLocalCart').then(() => {
              Message({ type: 'success', text: 'QQ登录成功' })
              router.push(store.state.user.redirectUrl || '/')
            })
          } else {
            // 已注册未绑定
            isBind.value = false
          }
        }).catch(e => {
          // 代表：使用qq登录失败(未注册)===>1. 没绑定帐号  2. 没有帐号
          isBind.value = false
          hasAccount.value = false
        })
      })
    }
    return { isBind, hasAccount, userName, userAvatar }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
  position: relative;
  margin: 10px auto;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  display: flex;
  justify-content: center;
  a {
    color: #666;
    display: flex;
    justify-content: center;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    &.active {
      color: @themeColor;
      border-color: @themeColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
