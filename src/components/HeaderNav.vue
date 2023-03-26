<template>
  <!--顶部地址导航-->
  <div class="topbar-container">
      <div id="site-topbar">
        <div class="lside">
          <a v-for="(item, index) in siteList" :key="index">{{item}}</a>
        </div>
        <!--购物车部分-->
        <div class="rside">
          <span v-if="!profile.token" class="member-icon">
            <router-link to="/login">登录</router-link>
            <router-link to="/login/callback">注册</router-link>
          </span>
          <span v-else  class="member-icon">
            <router-link to="/member">
              <j-icon iconClass="member" fontSize="10"  class="member-icon">{{profile.nickname}}</j-icon>
            </router-link>
            <a @click="handleExit()"  href="javascript:;">退出登录</a>
          </span>

          <router-link to="">消息通知</router-link>
          <router-link to="/member/order">我的订单</router-link>
          <!-- 购物车 -->
          <HeaderCart/>
        </div>
      </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import HeaderCart from './HeaderCart.vue'
export default {
  name: 'HeaderNav',
  components: { HeaderCart },
  setup () {
    const siteList = [
      '瞎猫官网',
      '瞎猫商城',
      '有料',
      '云服务',
      '企业团购',
      '资质证件',
      '协议规则',
      '社区',
      '服务',
      '下载app',
      '帮助中心'
    ]
    // 获取用户登录信息
    const store = useStore()
    const profile = computed(() => {
      return store.state.user.profile
    })
    const router = useRouter()
    const handleExit = () => {
      store.commit('user/setUser', {}) // 清空用户信息
      store.commit('cart/setCartList', []) // 清空购物车
      router.push('/login')
    }
    return {
      siteList,
      profile,
      handleExit
    }
  }
}
</script>

<style lang="less" scoped>
.topbar-container {
    width: 100%;
    background-color: #333;
    #site-topbar {
        width: 1240px;
        height: 40px;
        margin: 0 auto;
        font-size: 12px;
        .lside {
          float: left;
          a {
              line-height: 40px;
              color: #b0b0b0;
              cursor: pointer;
              &:hover {
                  color: #fff;
              }

              /* 选择除了最后一个元素a外的所有a元素 */
              &:not(:last-child)::after {
                  content: "|";
                  margin: 0 0.5em;
                  color: #424242;
              }
          }
        }
        .rside {
          float: right;
          display: flex;
          .member-icon{
            display: flex;
            a{
              display: flex;
              align-items: center;
              color: #999;
            }
          }
          a {
            color: #999;
            cursor: pointer;
            line-height: 40px;
            margin: 0 4px;
            &:hover {
              color: #fff;
            }
             /* 选择除了第一个元素a外的所有a元素 */
            &:not(:first-child)::before {
              content: "|";
              margin: 0 0.5em;
              color: #424242;
            }
          }
        }
    }
}
</style>
