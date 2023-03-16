<template>
  <div class="form-container">
    <Form class="form" :validation-schema="mySchema" autocomplete="off" v-slot="{errors}" ref="formRef">
      <div class="form-item">
        <Field :class="{error:errors.account}" as="j-input" prefix-icon="member" v-model.lazy="userForm.account" name="account" placeholder="请输入用户名"/>
        <div class="error-msg" v-if="errors.account">{{errors.account}}</div>
      </div>
      <div class="form-item">
        <Field :class="{error:errors.mobile}" as="j-input" prefix-icon="phone" v-model.lazy="userForm.mobile" name="mobile" placeholder="请输入手机号"/>
        <div class="error-msg" v-if="errors.mobile">{{errors.mobile}}</div>
      </div>
      <div class="form-item">
        <Field :class="{error:errors.code}" as="j-code" v-model="userForm.code" name="code"  :isActive="isActive"/>
        <div class="error-msg" v-if="errors.code">{{errors.code}}</div>
      </div>
      <div class="form-item">
        <Field :class="{error:errors.password}" as="j-input" prefix-icon="yuechi" v-model.lazy="userForm.password" name="password" placeholder="请输入密码"/>
        <div class="error-msg" v-if="errors.password">{{errors.password}}</div>
      </div>
      <div class="form-item">
        <Field :class="{error:errors.confirm}" as="j-input" prefix-icon="yuechi" v-model.lazy="userForm.confirm" name="confirm" placeholder="请确认密码"/>
        <div class="error-msg" v-if="errors.confirm">{{errors.confirm}}</div>
      </div>
      <div class="form-item">
        <j-button type="primary" size="large" @click="onSubmit" style="width: 100%">立即绑定</j-button>
      </div>
    </Form>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { Form, Field } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
export default {
  name: 'CallbackPatch',
  components: {
    Form,
    Field
  },
  setup () {
    const formRef = ref(null)
    const userForm = reactive({
      nickName: '',
      mobile: '',
      code: '',
      password: '',
      confirm: ''
    })
    // 验证码(发送验证码前验证手机号码是否合法)
    const isActive = computed(() => /^1\d{10}$/.test(userForm.mobile))
    // 校验规则对象
    const mySchema = {
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      confirm: (value) => {
        if (!value) return ('请再次确认密码')
        if (userForm.password !== userForm.confirm) return ('两次密码不一致')
        return true
      }
    }
    // 提交表单 => TODO
    const onSubmit = async () => {
      // 验证前端格式是否通过
      const valid = await formRef.value.validate()
      try {
        if (!valid) Message({ message: '格式验证未通过', type: 'error' })
      } catch {

      }
    }
    return { userForm, formRef, mySchema, isActive, onSubmit }
  }
}
</script>

<style scoped lang='less'>
.form-container{
  width: 500px;
  padding: 50px 0;
  margin: 0 auto;
  .form {
    &-item {
    margin-bottom: 20px;
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
}
</style>
