<template>
  <div class="form-container">
    <div class="user-info">
      <img :src="avatar"/>
      <p>Hi， {{ nickname }}欢迎来瞎猫商城，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <Form class="form" :validation-schema="mySchema" autocomplete="off" v-slot="{errors}" ref="formRef">
      <div class="form-item">
        <Field :class="{error:errors.mobile}" as="j-input" prefix-icon="phone" v-model.lazy="form.mobile" name="mobile" type="text" placeholder="请输入手机号  "/>
        <div class="error-msg" v-if="errors.mobile">{{errors.mobile}}</div>
      </div>
      <div class="form-item">
        <Field :class="{error:errors.code}" as="j-code" v-model="form.code" name="code" :isActive="isActive"/>
        <div class="error-msg" v-if="errors.code">{{errors.code}}</div>
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
  name: 'CallbackBind',
  components: {
    Form,
    Field
  },
  props: {
    nickname: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  setup () {
    const formRef = ref(null)
    const form = reactive({
      mobile: '',
      code: ''
    })
    // 验证码(发送验证码前验证手机号码是否合法)
    const isActive = computed(() => /^1\d{10}$/.test(form.mobile))
    // 校验规则对象
    const mySchema = {
      mobile: veeSchema.mobile,
      code: veeSchema.code
    }
    // 提交表单
    const onSubmit = async () => {
      // 验证前端格式是否通过
      const valid = await formRef.value.validate()
      try {
        if (!valid) Message({ message: '格式验证未通过', type: 'error' })
      } catch {

      }
    }
    return { formRef, form, mySchema, onSubmit, isActive }
  }
}
</script>

<style scoped lang='less'>
.form-container{
  width: 500px;
  padding: 50px 0;
  margin: 0 auto;
  .user-info {
    height: 80px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 60px;
      height: 60px;
    }
    p {
      padding-left: 10px;
    }
  }
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
