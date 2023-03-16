<template>
  <j-dialog
    v-model="dialogVisible"
    :title="(formData.id?'修改':'添加')+'收货地址'"
    width="40%"
    lock
  >
    <!-- 模态层内容 -->
    <Form class="form" :validation-schema="mySchema" autocomplete="off" v-slot="{errors}" ref="formCom">
      <div class="form-item">
        <span>收货人</span>
        <Field as="j-input" label="收货人"  v-model="formData.receiver" name="receiver" type="text" placeholder="请输入收货人姓名  "/>
        <div class="error-msg" v-if="errors.receiver">{{errors.receiver}}</div>
      </div>
      <div class="form-item">
        <span>手机号</span>
        <Field as="j-input" label="手机号"  v-model="formData.contact" name="contact" type="text" placeholder="请输入收货人手机号  "/>
        <div class="error-msg" v-if="errors.contact">{{errors.contact}}</div>
      </div>
      <div class="form-item">
        <span>地区</span>
        <Field as="j-input" label="地区"  v-model="formData.address" name="address" type="text" placeholder="请选择地区  "/>
        <div class="error-msg" v-if="errors.address">{{errors.address}}</div>
      </div>
      <div class="form-item">
        <span>详情地址</span>
        <Field as="j-input" label="详情地址"  v-model="formData.fullLocation" name="fullLocation" type="text" placeholder="请输入详情地址  "/>
        <div class="error-msg" v-if="errors.fullLocation">{{errors.fullLocation}}</div>
      </div>
      <div class="form-item">
        <span>邮政编码</span>
        <Field as="j-input" label="邮政编码"  v-model="formData.postalCode" name="postalCode" type="text" placeholder="请输入邮政编码  "/>
        <div class="error-msg" v-if="errors.postalCode">{{errors.postalCode}}</div>
      </div>
      <div class="form-item">
        <span>地址标签</span>
        <Field as="j-input" label="地址标签"  v-model="formData.addressTags" name="addressTags" type="text" placeholder="请输入地址标签，逗号分隔  "/>
        <div class="error-msg" v-if="errors.addressTags">{{errors.addressTags}}</div>
      </div>
    </Form>
    <!-- 底部按钮 -->
    <template #footer>
      <j-button @click="()=>dialogVisible = false">取消</j-button>
      <j-button type="primary" @click="()=>confirmAddress()">确定</j-button>
    </template>
  </j-dialog>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue'
import { Form, Field } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Form,
    Field
  },
  emits: ['on-success'],
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    const formLabelWidth = '180px'
    const formCom = ref(null)
    // 打开对话框
    const open = (address) => {
      if (address && address.id) {
        // 先填充数据 - 修改
        for (const key in formData) {
          formData[key] = address[key]
        }
      } else {
        // 先清空数据 - 添加
        for (const key in formData) {
          if (key !== 'isDefault') {
            formData[key] = ''
          }
        }
      }
      dialogVisible.value = true
    }
    // 表单数据
    const formData = reactive({
      id: '',
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 0,
      fullLocation: ''
    })
    // 校验规则对象
    const mySchema = {
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      isAgree: veeSchema.isAgree
    }
    const { proxy } = getCurrentInstance()
    // 提交表单
    const confirmAddress = () => {
      proxy.$api.addAddress(formData).then(res => {
        Message({ message: `${formData.id ? '修改' : '新增'}收货地址成功`, type: 'success' }) // 成功提示
        formData.id = formData.id ? formData.id : res.id // 新增的地址需要赋值响应的新id,修改的不需要
        dialogVisible.value = false // 关闭弹窗
        emit('on-success', formData) // 通知父组件
      })
    }
    return { dialogVisible, open, formData, formLabelWidth, confirmAddress, mySchema, formCom }
  }
}
</script>

<style lang="less" scoped>
.form {
  &-item {
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    width: 550px;
    span {
      text-align: right;
      padding-right: 12px;
      line-height: 46px;
      flex: 0 0 180px;
    }
  }
}
</style>
