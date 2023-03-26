<template>
  <div class="account-box">
    <div class="toggle">
      <span  @click="isMsgLogin=false" v-if="isMsgLogin">
        <j-icon iconClass="zhanghaoguanli" >账号登录</j-icon>
      </span>
      <span  @click="isMsgLogin=true" v-else>
        <j-icon iconClass="message" >短信登录</j-icon>
      </span>
    </div>
    <Form class="form" :validation-schema="schema" autocomplete="off" v-slot="{errors}" ref="formCom">
      <!-- 账号登录 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <Field :class="{error:errors.account}" as="j-input" prefix-icon="member" v-model.lazy="form.account" name="account" placeholder="请输入用户名"/>
          <div class="error-msg" v-if="errors.account">{{errors.account}}</div>
        </div>
        <div class="form-item">
          <Field :class="{error:errors.password}" as="j-input"  prefix-icon="yuechi" v-model.lazy="form.password" name="password" type="password" placeholder="请输入密码" />
          <div class="error-msg" v-if="errors.password">{{errors.password}}</div>
        </div>
      </template>
      <!-- 短信登录 -->
      <template v-else>
        <div class="form-item">
          <Field :class="{error:errors.mobile}" as="j-input" prefix-icon="phone" v-model.lazy="form.mobile" name="mobile" type="text" placeholder="请输入手机号  "/>
          <div class="error-msg" v-if="errors.mobile">{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <Field :class="{error:errors.code}" as="j-code" v-model="form.code" name="code" :isActive="isActive"/>
          <div class="error-msg" v-if="errors.code">{{errors.code}}</div>
          <!-- <JCode v-model="form.code" :isActive="true"/> -->
        </div>
      </template>
      <!-- 条款确认 -->
      <div class="form-item">
        <div class="agree">
          <Field as="j-checkbox" v-model="form.isAgree" name="isAgree"/>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error-msg" v-if="errors.isAgree">{{errors.isAgree}}</div>
      </div>
      <!-- 提交登录 -->
      <j-button type="primary" full  @click="submit">登录</j-button>
    </Form>
  </div>
  <div class="action">
    <!-- <span id="qqLoginBtn">
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a>
    </span> -->
    <div class="url">
      <router-link to="/login/callback">忘记密码</router-link>
      <router-link to="/login/callback">免费注册</router-link>
    </div>
  </div>
</template>

<script>
// import QC from 'qc'
import { reactive, ref, onMounted, watch, computed } from 'vue'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import Api from '@/api'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    onMounted(() => {
      // 组件渲染完毕，使用QC生成QQ登录按钮
      // QC.Login({
      //   btnId: 'qqLoginBtn'
      // })
    })
    // const { proxy } = getCurrentInstance()
    // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 使用route
    const route = useRoute()
    // 是否短信登录
    const isMsgLogin = ref(false)
    const formCom = ref(null)
    // 登录用户数据
    const userData = ref(null)
    // 重置表单
    watch(isMsgLogin, () => {
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm()
    })

    // 表单提交数据
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // 验证码(发送验证码前验证手机号码是否合法)
    const isActive = computed(() => /^1\d{10}$/.test(form.mobile))

    // 校验规则对象
    const mySchema = {
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      isAgree: veeSchema.isAgree
    }

    // 登录提交
    const submit = async () => {
      // 验证前端格式是否通过
      const valid = await formCom.value.validate()
      try {
        if (!valid) Message({ message: '格式验证未通过', type: 'error' })
        const currentApi = isMsgLogin.value ? 'userMobileLogin' : 'userAccountLogin'
        userData.value = await Api[currentApi](form)
        // 登录成功后进行处理
        if (Object.keys(userData.value).length !== 0 && userData.value.id) {
          // 1. 存储用户信息
          const { id, account, nickname, avatar, token, mobile } = userData.value
          store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
          // 2. 合并购物车操作
          store.dispatch('cart/mergeLocalCart').then(() => {
            Message({ message: '登录成功', type: 'success' })
            router.push(route.query.redirectUrl || '/')
            // 重置登录表单
            // formCom.value.resetForm()
          })
        } else {
          throw new Error('登录失败')
        }
      } catch (error) {
        Message({ message: error.message, type: 'error' })
      }
    }
    return { isMsgLogin, form, schema: mySchema, submit, formCom, isActive }
  }
}
</script>

<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    cursor: pointer;
    a {
      color: @themeColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 24px;
    }
    .agree {
      display: flex;
      align-items: center;
      height: 26px;
      a {
        color: @themeColor;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      background: @themeColor;
      margin-top: 20px;
      &.disabled {
        background: #cfcdcd;
      }
    }
    .error-msg {
      position: absolute;
      font-size: 12px;
      line-height: 20px;
      color: #f56c;
      // opacity: 1;
      transition: all .2s linear;
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
